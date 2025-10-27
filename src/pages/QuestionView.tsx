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
	const { questions, isLoading } = useQuestion();
	const { accessToken } = useAuth();

	const [question, setQuestion] = useState<IndividualQuestionProps | null>(
		null
	);

	const [showSchema, setShowSchema] = useState(false);
	const [sqlQuery, setSqlQuery] = useState("");
	const [queryResult, setQueryResult] = useState<
		| [
				{
					[key: string]: string | number | null;
				}
		  ]
		| null
	>(null);
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
	const [showingSolution, setShowingSolution] = useState(false);
	const [checkingAnswer, setCheckingAnswer] = useState(false);
	const [runningQuery, setRunningQuery] = useState(false);
	const [solutionMySQL, setSolutionMySQL] = useState("");
	const [solutionPostgreSQL, setSolutionPostgreSQL] = useState("");
	const [dbType, setDbType] = useState("mysql");
	const { addToast } = useGame();
	const [showLoginModal, setShowLoginModal] = useState(false);
	const handleRequireLogin = () => {
		setShowLoginModal(true);
	};

	const fetchQuestionById = async (id: number) => {
		try {
			const response = await fetch(`${baseURL}/api/problems/${id}/`, {});
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

	const hasFreeAccess = question?.is_premium === false;
	// Navigation logic
	const handleNavigate = (direction: "prev" | "next") => {
		const currentIndex = questions.findIndex(
			(q) => q.id === Number(questionId)
		);
		if (direction === "prev" && currentIndex > 0) {
			// Go to previous question
			const prevQuestion = questions[currentIndex - 1];
			onSelectQuestion(prevQuestion.id);
		} else if (
			direction === "next" &&
			currentIndex < questions.length - 1
		) {
			// Go to next question
			const nextQuestion = questions[currentIndex + 1];
			onSelectQuestion(nextQuestion.id);
		}
	};

	const handleRunQuery = async () => {
		setQueryResult(null); // Show loading state
		setIsCorrect(null); // Reset correctness state
		setRunningQuery(true);

		try {
			const response = await fetch(`${baseURL}/api/submit/`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
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
				// If the API returns an error, show it in ResultsView
				setQueryResult({
					error: data?.message || "Failed to submit solution",
				} as any);
				return;
			}

			setQueryResult(data?.data || null);
			if (data?.status === "Success") {
				setIsCorrect(true);
			} else if (data?.status === "Error") {
				// If the API returns an error, show it in ResultsView
				setQueryResult({
					error: data?.message || "Failed to submit solution",
				} as any);
				return;
			} else {
				setIsCorrect(false);
			}

			// If your API returns a correctness flag, set it here:
			if (typeof data?.is_correct === "boolean") {
				setIsCorrect(data.is_correct);
				if (
					data.is_correct &&
					question &&
					question.status === "unseen"
				) {
					// markQuestionComplete(question.id);
					addToast(
						`✅ You solved Question ${question.id}!`,
						"success"
					);
					const pointsEarned =
						question.id <= 40 ? 10 : question.id <= 70 ? 20 : 40;
					addToast(
						`🎉 +${pointsEarned} points added to your score!`,
						"success"
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

	const handleCheckAnswer = async () => {
		setQueryResult(null); // Show loading state
		setIsCorrect(null); // Reset correctness state
		setCheckingAnswer(true);

		try {
			const response = await fetch(`${baseURL}/api/submit/`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
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
				// If the API returns an error, show it in ResultsView
				setQueryResult({
					error: data?.message || "Failed to submit solution",
				} as any);
				return;
			}

			setQueryResult(data?.data || null);
			if (data?.status === "Success") {
				setIsCorrect(true);
			} else if (data?.status === "Error") {
				// If the API returns an error, show it in ResultsView
				setQueryResult({
					error: data?.message || "Failed to submit solution",
				} as any);
				return;
			} else {
				setIsCorrect(false);
			}

			// If your API returns a correctness flag, set it here:
			if (typeof data?.is_correct === "boolean") {
				setIsCorrect(data.is_correct);
				if (
					data.is_correct &&
					question &&
					question.status === "unseen"
				) {
					// markQuestionComplete(question.id);
					addToast(
						`✅ You solved Question ${question.id}!`,
						"success"
					);
					const pointsEarned =
						question.id <= 40 ? 10 : question.id <= 70 ? 20 : 40;
					addToast(
						`🎉 +${pointsEarned} points added to your score!`,
						"success"
					);
				}
			}
		} catch (err) {
			setQueryResult({
				error: "Network error. Please try again.",
			} as any);
		} finally {
			setCheckingAnswer(false);
		}
	};

	const handleShowSolution = async () => {
		// If it's one of the first 5 questions, show the solution directly
		if (hasFreeAccess) {
			// Fetch solutions if not already fetched
			if (!solutionMySQL || !solutionPostgreSQL) {
				const response = await fetch(
					`${baseURL}/api/problems/${questionId}/`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch solutions");
				}
				const data = await response.json();
				setSolutionMySQL(data.solution_mysql);
				setSolutionPostgreSQL(data.solution_postgresql);
			}

			setShowingSolution(true);
		} else {
			// Otherwise, show checkout modal
			onShowCheckout();
		}
	};
	const handleHideSolution = () => {
		setShowingSolution(false);
	};
	// Generate explanation based on question ID
	const getExplanation = (id: number) => {
		if (id === 1) {
			return "This query shows 5 rows from orders for a quick peek at the data. Without an ORDER BY, the rows are arbitrary, so results may differ each run. SELECT * is fine for exploration, but in real queries it's better to pick only the columns you need.";
		} else if (id === 2) {
			return "This query filters the orders table to only show order_id values where the ship_mode is exactly 'Second Class'. The WHERE clause acts as a filter, and we're only selecting the order_id column rather than all columns.";
		} else if (id === 3) {
			return "This query finds orders with discounts greater than 20% (0.2). The discount column stores values as decimals between 0 and 1, so 0.2 represents 20%.";
		} else if (id === 4) {
			return "This query filters orders to only include those with sales values exceeding $500. The WHERE clause creates a simple numeric comparison.";
		} else if (id === 5) {
			return "This query selects all product names from the products table where the category is 'Office Supplies'. It demonstrates a basic text comparison in the WHERE clause.";
		} else {
			return "This solution demonstrates the key SQL concepts needed to solve the problem efficiently. Note the structure of the query, the choice of clauses, and how the data is filtered and presented to match the requirements.";
		}
	};

	useEffect(() => {
		setSolutionMySQL("");
		setSolutionPostgreSQL("");
		setShowingSolution(false);
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
			{/* Question header - more compact on mobile */}
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
					{question.status === "completed" && (
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
			{/* Schema viewer toggle - more compact */}
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
			{/* SQL Editor - reduced height on mobile */}
			<div className="mb-3 sm:mb-4">
				<SQLEditor
					dbType={dbType}
					setDbType={setDbType}
					value={sqlQuery}
					onChange={setSqlQuery}
				/>
			</div>
			{/* Action buttons - improved mobile layout */}
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

			{showLoginModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
					<div className="bg-white rounded-lg p-6 max-w-sm w-full text-center relative">
						<button
							onClick={() => setShowLoginModal(false)}
							className="px-4 py-2  text-gray-600 top-1 right-1 rounded-md  absolute "
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

			{/* Solution section (if showing and has free access) */}
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
						{dbType === "mysql"
							? solutionMySQL || "Loading solution..."
							: solutionPostgreSQL || "Loading solution..."}
					</div>
					{/* Explanation section */}
					<div className="mt-4">
						<h4 className="text-md font-medium text-green-800 mb-2">
							Explanation:
						</h4>
						<p className="text-sm text-green-700 bg-white p-3 rounded border border-green-200">
							{getExplanation(question.id)}
						</p>
					</div>
					<p className="mt-4 text-sm text-green-700">
						Try running this query to see the results!
					</p>
				</div>
			)}
			{/* Results view */}
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

			{queryResult && (
				<div className="mb-4">
					{isCorrect !== null && (
						<div
							className={`p-3 mb-4 rounded-md ${
								isCorrect
									? "bg-green-100 text-green-700"
									: "bg-red-100 text-red-700"
							}`}
						>
							{isCorrect
								? "Correct! Your query matches the expected output."
								: "Incorrect. Try again!"}
						</div>
					)}
					<ResultsView result={queryResult} />
				</div>
			)}
		</div>
	);
}
