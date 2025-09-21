import { useState } from "react";
import { questions } from "../data/questions";
import {
	ChevronDownIcon,
	ChevronUpIcon,
	DatabaseIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	XIcon,
} from "lucide-react";
import { useGame } from "@/hooks/use-game";
import { SchemaViewer } from "./SchemaViewer";
import { SQLEditor } from "./SQLEditor";
import { ResultsView } from "./ResultsView";
export function QuestionView({
	questionId,
	onShowCheckout,
	onSelectQuestion,
}: {
	questionId: number;
	onShowCheckout: () => void;
	onSelectQuestion: React.Dispatch<React.SetStateAction<number>>;
}) {
	const [showSchema, setShowSchema] = useState(false);
	const [sqlQuery, setSqlQuery] = useState("");
	const [queryResult, setQueryResult] = useState<{
		columns: string[];
		rows: { id: number; name: string; value: number }[];
	} | null>(null);
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
	const [showingSolution, setShowingSolution] = useState(false);
	const { markQuestionComplete, addToast } = useGame();
	// Find the current question
	const question =
		questions.find((q) => q.id === Number(questionId)) || questions[0];
	// Check if this question has a free solution (first 5 questions)
	const hasFreeAccess = question.id <= 5;
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
	const handleRunQuery = () => {
		// In a real app, this would send the query to a backend
		// For this demo, we'll simulate a response
		const mockResult = {
			columns: ["id", "name", "value"],
			rows: [
				{
					id: 1,
					name: "Item 1",
					value: 100,
				},
				{
					id: 2,
					name: "Item 2",
					value: 200,
				},
				{
					id: 3,
					name: "Item 3",
					value: 300,
				},
			],
		};
		setQueryResult(mockResult);
		// Check if query is correct (simplified for demo)
		const isQueryCorrect =
			sqlQuery.toLowerCase().includes("select") &&
			sqlQuery.toLowerCase().includes("from");
		setIsCorrect(isQueryCorrect);
	};
	const handleCheckAnswer = () => {
		// In a real app, this would validate the query against the expected solution
		// For this demo, we'll use the same simplified validation
		const isQueryCorrect =
			sqlQuery.toLowerCase().includes("select") &&
			sqlQuery.toLowerCase().includes("from");
		setIsCorrect(isQueryCorrect);
		// If correct and not already completed, mark as completed
		if (isQueryCorrect && !question.completed) {
			// Mark question as completed in our game context
			markQuestionComplete(question.id);
			// In a real app, we would update the question in the database
			question.completed = true;
			// Show success toast
			addToast(`✅ You solved Question ${question.id}!`, "success");
			// Calculate points earned
			const pointsEarned =
				question.id <= 40 ? 10 : question.id <= 70 ? 20 : 40;
			addToast(
				`🎉 +${pointsEarned} points added to your score!`,
				"success"
			);
		}
		// Display the result if not already shown
		if (!queryResult) {
			const mockResult = {
				columns: ["id", "name", "value"],
				rows: [
					{
						id: 1,
						name: "Item 1",
						value: 100,
					},
					{
						id: 2,
						name: "Item 2",
						value: 200,
					},
					{
						id: 3,
						name: "Item 3",
						value: 300,
					},
				],
			};
			setQueryResult(mockResult);
		}
	};
	const handleShowSolution = () => {
		// If it's one of the first 5 questions, show the solution directly
		if (hasFreeAccess) {
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
	return (
		<div className="p-4 sm:p-6 max-w-5xl mx-auto h-full overflow-y-auto md:max-h-[calc(100vh-13rem)]">
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
						{question.id <= 40
							? "Easy"
							: question.id <= 70
							? "Intermediate"
							: "Hard"}
					</span>
					<span className="text-xs sm:text-sm text-gray-500 px-2 py-0.5 sm:py-1 bg-gray-100 rounded-md">
						{question.id <= 40
							? "10 points"
							: question.id <= 70
							? "20 points"
							: "40 points"}
					</span>
					{question.completed && (
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
				<SQLEditor value={sqlQuery} onChange={setSqlQuery} />
			</div>
			{/* Action buttons - improved mobile layout */}
			<div className="flex flex-wrap gap-2 mb-6">
				<button
					onClick={handleRunQuery}
					className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-[#008080] text-white rounded-md hover:bg-[#006666] transition-colors text-sm sm:text-base"
				>
					Run Query
				</button>
				<button
					onClick={handleCheckAnswer}
					className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-[#008080] text-white rounded-md hover:bg-[#006666] transition-colors text-sm sm:text-base"
				>
					Check Answer
				</button>
				<button
					onClick={handleShowSolution}
					className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 ${
						showingSolution && hasFreeAccess
							? "bg-gray-400 hover:bg-gray-500"
							: "bg-[#40D693] hover:bg-[#35b47c]"
					} text-white rounded-md transition-colors text-sm sm:text-base`}
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
						{question.solution}
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
