import { useEffect, useState } from "react";
import {
	ChevronDownIcon,
	ChevronUpIcon,
	DatabaseIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	XIcon,
	X,
} from "lucide-react";
import { useGame } from "@/hooks/use-game";
import { SchemaViewer } from "./SchemaViewer";
import { SQLEditor } from "./SQLEditor";
import { ResultsView } from "./ResultsView";
import { QuestionProps, useQuestion } from "@/hooks/use-question";
import { useAuth } from "@/hooks/use-auth";
import { baseURL } from "@/config/dotenv";
import { Link } from "react-router-dom";

import { CertificateEarnedModal } from "@/components/leaderboard/CertificateEarnedModal";

interface IndividualQuestionProps extends QuestionProps {
	description: string;
}

export function QuestionView({
	questionId,
	onShowCheckout,
	onSelectQuestion,
}: {
	questionId: number;
	onShowCheckout: () => void;
	onSelectQuestion: React.Dispatch<React.SetStateAction<number>>;
}) {
	const { questions, fetchQuestions, isLoading } = useQuestion();
	const { accessToken, hasUnlockedSolutions } = useAuth();
	const { fetchUserProgress, certificateData, fetchCertificateAndBadges } =
		useGame();

	const [question, setQuestion] = useState<IndividualQuestionProps | null>(
		null,
	);
	const [showSchema, setShowSchema] = useState(false);
	const [sqlQuery, setSqlQuery] = useState("");
	const [queryResult, setQueryResult] = useState<
		| [
				{
					[key: string]: string | number | null;
				},
		  ]
		| null
	>(null);
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
	const [showingSolution, setShowingSolution] = useState(false);
	const [checkingAnswer, setCheckingAnswer] = useState(false);
	const [runningQuery, setRunningQuery] = useState(false);
	const [solutionMySQL, setSolutionMySQL] = useState("");
	const [isCheckedAnswer, setIsCheckedAnswer] = useState(false);
	const [solutionPostgreSQL, setSolutionPostgreSQL] = useState("");
	const [solutionExplanation, setSolutionExplanation] = useState("");
	const [dbType, setDbType] = useState("mysql");
	const { addToast } = useGame();
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showCertificateModal, setShowCertificateModal] = useState(false);

	// Load SQL query from localStorage when component mounts or questionId changes
	useEffect(() => {
		const savedQuery = localStorage.getItem(`sql-draft-${questionId}`);
		if (savedQuery) {
			setSqlQuery(savedQuery);
		} else {
			setSqlQuery("");
		}
	}, [questionId]);

	// Save SQL query to localStorage whenever it changes
	const handleSqlQueryChange = (newQuery: string) => {
		setSqlQuery(newQuery);
		localStorage.setItem(`sql-draft-${questionId}`, newQuery);
	};

	const handleRequireLogin = () => {
		setShowLoginModal(true);
	};

	const fetchQuestionById = async (id: number) => {
		try {
			const headers: HeadersInit = {
				"Content-Type": "application/json",
			};

			if (accessToken) {
				headers["Authorization"] = `Bearer ${accessToken}`;
			}

			const response = await fetch(`${baseURL}/api/problems/${id}/`, {
				method: "GET",
				headers,
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error("Failed to fetch question");
			}
			setQuestion(data);
		} catch (err) {
			console.log("Error fetching question: ", err);
		}
	};

	useEffect(() => {
		fetchQuestionById(questionId);
	}, [questionId]);

	const hasFreeAccess =
		question?.is_premium === false || hasUnlockedSolutions;

	const handleNavigate = (direction: "prev" | "next") => {
		const currentIndex = questions.findIndex(
			(q) => q.id === Number(questionId),
		);
		if (direction === "prev" && currentIndex > 0) {
			const prevQuestion = questions[currentIndex - 1];
			onSelectQuestion(prevQuestion.id);
		} else if (
			direction === "next" &&
			currentIndex < questions.length - 1
		) {
			const nextQuestion = questions[currentIndex + 1];
			onSelectQuestion(nextQuestion.id);
		}
	};

	// ✅ FIXED: when running query, reset isCheckedAnswer so message won't show
	const handleRunQuery = async () => {
		setQueryResult(null);
		setIsCorrect(null);
		setIsCheckedAnswer(false); // ✅ ensures no "Correct/Incorrect" on Run Query
		setRunningQuery(true);

		try {
			const headers: HeadersInit = {
				"Content-Type": "application/json",
			};

			if (accessToken) {
				headers["Authorization"] = `Bearer ${accessToken}`;
			}

			const response = await fetch(`${baseURL}/api/submit/`, {
				headers,
				method: "POST",
				body: JSON.stringify({
					problem_id: questionId,
					sql: sqlQuery,
					db_type: dbType,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				setQueryResult({
					error: data?.message || "Failed to submit solution",
				} as any);
				return;
			}

			setQueryResult(data?.data || null);

			if (data?.status === "Success") {
				setIsCorrect(true);
			} else if (data?.status === "Error") {
				setQueryResult({
					error: data?.message || "Failed to submit solution",
				} as any);
				return;
			} else {
				setIsCorrect(false);
			}

			if (data?.newly_earned_certificate === true) {
				await fetchCertificateAndBadges();
				setShowCertificateModal(true);
			}

			if (typeof data?.is_correct === "boolean") {
				setIsCorrect(data.is_correct);
				if (
					data.is_correct &&
					question &&
					question.status === "unseen"
				) {
					addToast(
						`✅ You solved Question ${question.id}!`,
						"success",
					);
					const pointsEarned =
						question.id <= 40 ? 10 : question.id <= 70 ? 20 : 40;
					addToast(
						`🎉 +${pointsEarned} points added to your score!`,
						"success",
					);
				}
			}
		} catch (err) {
			setQueryResult({
				error: "Network error. Please try again.",
			} as any);
		} finally {
			setRunningQuery(false);
		}
	};

	// ✅ FIXED: "Check Answer" explicitly sets isCheckedAnswer = true
	const handleCheckAnswer = async () => {
		setQueryResult(null);
		setIsCheckedAnswer(false);
		setIsCorrect(null);
		setCheckingAnswer(true);

		try {
			const response = await fetch(`${baseURL}/api/submit/`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				method: "POST",
				body: JSON.stringify({
					problem_id: questionId,
					sql: sqlQuery,
					db_type: dbType,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				setQueryResult({
					error: data?.message || "Failed to submit solution",
				} as any);
				setIsCheckedAnswer(true);
				return;
			}

			setQueryResult(data?.data || null);
			setIsCheckedAnswer(true); // ✅ now correctness message will appear only here

			if (data?.status === "Success") {
				setIsCorrect(true);
			} else if (data?.status === "Error") {
				setQueryResult({
					error: data?.message || "Failed to submit solution",
				} as any);
				return;
			} else {
				setIsCorrect(false);
			}

			if (data?.newly_earned_certificate === true) {
				await fetchCertificateAndBadges();
				setShowCertificateModal(true);
			}

			if (typeof data?.is_correct === "boolean") {
				setIsCorrect(data.is_correct);
				if (
					data.is_correct &&
					question &&
					question.status === "unseen"
				) {
					addToast(
						`✅ You solved Question ${question.id}!`,
						"success",
					);
					const pointsEarned =
						question.id <= 40 ? 10 : question.id <= 70 ? 20 : 40;
					addToast(
						`🎉 +${pointsEarned} points added to your score!`,
						"success",
					);
				}
			}
		} catch (err) {
			setQueryResult({
				error: "Network error. Please try again.",
			} as any);
			setIsCheckedAnswer(true);
		} finally {
			setCheckingAnswer(false);
			fetchQuestions();
			const data = await fetchUserProgress();
			console.log(
				"🚀 ~ QuestionView.tsx:263 ~ handleCheckAnswer ~ const:",
				data,
			);
		}
	};

	const handleShowSolution = async () => {
		if (hasFreeAccess) {
			if (!solutionMySQL || !solutionPostgreSQL) {
				const headers: HeadersInit = {
					"Content-Type": "application/json",
				};

				if (accessToken) {
					headers["Authorization"] = `Bearer ${accessToken}`;
				}

				const response = await fetch(
					`${baseURL}/api/problems/${questionId}/`,
					{
						headers,
					},
				);

				if (!response.ok) {
					throw new Error("Failed to fetch solutions");
				}
				const data = await response.json();
				setSolutionMySQL(data.solution_mysql);
				setSolutionPostgreSQL(data.solution_postgresql);
				setSolutionExplanation(data.explanation || "");
			}
			setShowingSolution(true);
		} else {
			onShowCheckout();
		}
	};

	const handleHideSolution = () => {
		setShowingSolution(false);
	};

	useEffect(() => {
		setSolutionMySQL("");
		setSolutionPostgreSQL("");
		setSolutionExplanation("");
		setShowingSolution(false);
		// Reset results and status when switching questions
		setQueryResult(null);
		setIsCorrect(null);
		setIsCheckedAnswer(false);
		// SQL query is now loaded from localStorage, not reset here
	}, [questionId]);

	if (isLoading || !question) {
		return (
			<div className="p-4 sm:p-6 container mx-auto h-full overflow-y-auto">
				<div className="flex justify-center items-center h-full">
					<p className="text-gray-500">Loading question...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="p-4 sm:p-6 container mx-auto h-full overflow-y-auto">
			{/* Question header */}
			<div className="mb-3 sm:mb-6">
				<div className="flex flex-wrap items-center gap-2 mb-2">
					<span
						className={`px-2 py-0.5 sm:py-1 text-xs font-medium rounded-md ${
							question.id <= 40
								? "bg-green-100 text-green-700"
								: question.id <= 70
									? "bg-yellow-100 text-yellow-700"
									: "bg-blue-100 text-blue-700"
						}`}
					>
						{question?.difficulty}
					</span>
					<span className="text-xs sm:text-sm text-gray-500 px-2 py-0.5 sm:py-1 bg-gray-100 rounded-md">
						{question?.points + " Points"}
					</span>
					{question?.status === "completed" && (
						<span className="text-xs sm:text-sm text-green-600 px-2 py-0.5 sm:py-1 bg-green-50 rounded-md flex items-center">
							<svg
								className="w-3 h-3 mr-1"
								viewBox="0 0 12 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M1 6L4.5 9.5L11 2.5"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							Completed
						</span>
					)}
				</div>
				<h1 className="text-xl sm:text-2xl font-bold text-gray-800">
					{question.id}. {question.title}
				</h1>
				<p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
					{question.description}
				</p>
			</div>

			{/* Schema viewer toggle */}
			<div className="mb-3 sm:mb-4">
				<button
					onClick={() => setShowSchema(!showSchema)}
					className="flex items-center text-[#008080] hover:text-[#006666] font-medium text-sm sm:text-base"
				>
					<DatabaseIcon size={16} className="mr-1" />
					Database Schema
					{showSchema ? (
						<ChevronUpIcon size={16} className="ml-1" />
					) : (
						<ChevronDownIcon size={16} className="ml-1" />
					)}
				</button>
				{showSchema && <SchemaViewer />}
			</div>

			{/* SQL Editor */}
			<div className="mb-3 sm:mb-4">
				<SQLEditor
					dbType={dbType}
					setDbType={setDbType}
					value={sqlQuery}
					onChange={handleSqlQueryChange}
				/>
			</div>

			{/* Action buttons */}
			<div className="flex flex-wrap gap-2 mb-6">
				<button
					onClick={accessToken ? handleRunQuery : handleRequireLogin}
					disabled={runningQuery}
					className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-[#008080] text-white rounded-md hover:bg-[#006666] transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Run Query
				</button>

				<button
					onClick={
						accessToken ? handleCheckAnswer : handleRequireLogin
					}
					disabled={checkingAnswer}
					className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-[#008080] text-white rounded-md hover:bg-[#006666] transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Check Answer
				</button>

				<button
					onClick={
						accessToken ? handleShowSolution : handleRequireLogin
					}
					className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 ${
						showingSolution && hasFreeAccess
							? "bg-gray-400 hover:bg-gray-500"
							: "bg-[#40D693] hover:bg-[#35b47c]"
					} text-white rounded-md transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed`}
					disabled={showingSolution && hasFreeAccess}
				>
					{showingSolution && hasFreeAccess
						? "Solution Shown"
						: hasFreeAccess
							? "Show Solution"
							: "Show Solution 🔒"}
				</button>

				<div className="flex w-full sm:w-auto mt-2 sm:mt-0 sm:ml-auto">
					<button
						onClick={() => handleNavigate("prev")}
						className="flex-1 sm:flex-none px-4 py-2 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300 transition-colors"
						aria-label="Previous question"
					>
						<ChevronLeftIcon size={20} />
					</button>
					<button
						onClick={() => handleNavigate("next")}
						className="flex-1 sm:flex-none px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 transition-colors"
						aria-label="Next question"
					>
						<ChevronRightIcon size={20} />
					</button>
				</div>
			</div>

			{/* Login modal */}
			{showLoginModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
					<div className="bg-white rounded-lg p-6 max-w-sm w-full text-center relative">
						<button
							onClick={() => setShowLoginModal(false)}
							className="px-4 py-2 text-gray-600 top-1 right-1 rounded-md absolute"
						>
							<X />
						</button>
						<h2 className="text-lg font-bold mb-2 mt-6">
							Login Required
						</h2>
						<p className="mb-4">
							You need to be logged in to run queries or view
							solutions.
						</p>

						<Link
							to="/auth"
							onClick={() => setShowLoginModal(false)}
							className="px-4 py-2 bg-[#008080] text-white rounded-md hover:bg-[#006666]"
						>
							Login
						</Link>
					</div>
				</div>
			)}

			{/* Query status */}
			{runningQuery && (
				<div className="text-gray-500 animate-pulse">
					Running query...
				</div>
			)}

			{checkingAnswer && (
				<div className="text-gray-500 animate-pulse">
					Checking query...
				</div>
			)}

			{/* ✅ Result section */}
			{queryResult && (
				<div className="mb-4">
					{isCheckedAnswer && isCorrect !== null && (
						<div
							className={`p-3 mb-4 rounded-md ${
								isCorrect
									? "bg-green-100 text-green-700"
									: "bg-red-100 text-red-700"
							}`}
						>
							{isCorrect
								? "🎉 Correct! Your query matches the expected output."
								: "Incorrect. Try again!"}
						</div>
					)}
					<ResultsView result={queryResult} />
				</div>
			)}

			{/* Solution section */}
			{showingSolution && hasFreeAccess && (
				<div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
					<div className="flex justify-between items-center mb-2">
						<h3 className="text-lg font-medium text-green-800">
							Solution
						</h3>
						<button
							onClick={handleHideSolution}
							className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
							aria-label="Hide solution"
						>
							<XIcon size={16} />
						</button>
					</div>
					<div className="bg-white p-3 rounded border border-green-200 font-mono text-sm overflow-x-auto mb-3">
						<pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">
							{dbType === "mysql"
								? solutionMySQL || "Loading solution..."
								: solutionPostgreSQL || "Loading solution..."}
						</pre>
					</div>

					<div className="mt-4">
						<h4 className="text-md font-medium text-green-800 mb-2">
							Explanation:
						</h4>
						<p className="text-sm text-green-700 bg-white p-3 rounded border border-green-200">
							{solutionExplanation || "No explanation available."}
						</p>
					</div>
					<p className="mt-4 text-sm text-green-700">
						Try running this query to see the results!
					</p>
				</div>
			)}

			{/* Certificate Earned Modal */}
			{showCertificateModal && (
				<CertificateEarnedModal
					isOpen={showCertificateModal}
					onClose={() => setShowCertificateModal(false)}
					name={
						certificateData?.name_on_certificate ||
						certificateData?.full_name ||
						certificateData?.username ||
						"Your Name"
					}
					earnedOn={
						certificateData?.certificate_earned_on
							? new Date(
									certificateData.certificate_earned_on,
								).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})
							: "Today"
					}
					certId={certificateData?.certificate_id || "LOADING..."}
				/>
			)}
		</div>
	);
}
