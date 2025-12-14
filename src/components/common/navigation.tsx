import { useQuestion } from "@/hooks/use-question";
import { CircleIcon, FilterIcon } from "lucide-react";
import { useState } from "react";
export function Navigation({
	selectedQuestionId,
	onSelectQuestion,
}: {
	selectedQuestionId: number;
	onSelectQuestion: (questionId: number) => void;
}) {
	const { questions } = useQuestion();

	const [filter, setFilter] = useState("all"); // 'all', 'easy', 'intermediate', 'hard'
	const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
	// Filter questions based on new ID ranges rather than difficulty property
	const filteredQuestions =
		filter === "all"
			? questions
			: filter === "easy"
			? questions.filter((q) => q.id <= 40)
			: filter === "intermediate"
			? questions.filter((q) => q.id > 40 && q.id <= 70)
			: questions.filter((q) => q.id > 70);
	return (
		<div className="w-full md:w-96 bg-white border-b md:border-b-0 md:border-r border-gray-200 flex flex-col md:h-full">
			{/* Mobile filter toggle */}
			<div className="md:hidden p-3 border-b border-gray-200 flex items-center justify-between">
				<span className="font-medium text-gray-700">Questions</span>
				<button
					onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
					className="flex items-center gap-1 text-sm text-gray-600 px-2 py-1 rounded-md bg-gray-100"
				>
					<FilterIcon size={14} />
					Filter:{" "}
					{filter === "all"
						? "All"
						: filter === "easy"
						? "Easy"
						: filter === "intermediate"
						? "Intermediate"
						: "Hard"}
				</button>
			</div>
			{/* Filter buttons */}
			<div
				className={`p-3 border-b border-gray-200 ${
					mobileFilterOpen ? "flex" : "hidden md:flex"
				} flex-wrap gap-2`}
			>
				<button
					onClick={() => {
						setFilter("all");
						setMobileFilterOpen(false);
					}}
					className={`px-3 py-1 text-xs rounded-md whitespace-nowrap ${
						filter === "all"
							? "bg-[#008080] text-white"
							: "bg-gray-100 hover:bg-gray-200"
					}`}
				>
					All (90)
				</button>
				<button
					onClick={() => {
						setFilter("easy");
						setMobileFilterOpen(false);
					}}
					className={`px-3 py-1 text-xs rounded-md whitespace-nowrap ${
						filter === "easy"
							? "bg-green-500 text-white"
							: "bg-gray-100 hover:bg-gray-200"
					}`}
				>
					Easy (40)
				</button>
				<button
					onClick={() => {
						setFilter("intermediate");
						setMobileFilterOpen(false);
					}}
					className={`px-3 py-1 text-xs rounded-md whitespace-nowrap ${
						filter === "intermediate"
							? "bg-yellow-500 text-white"
							: "bg-gray-100 hover:bg-gray-200"
					}`}
				>
					Intermediate (30)
				</button>
				<button
					onClick={() => {
						setFilter("hard");
						setMobileFilterOpen(false);
					}}
					className={`px-3 py-1 text-xs rounded-md whitespace-nowrap ${
						filter === "hard"
							? "bg-blue-700 text-white"
							: "bg-gray-100 hover:bg-gray-200"
					}`}
				>
					Hard (20)
				</button>
			</div>
			{/* Questions list */}
			<div className="flex-1 overflow-y-auto md:max-h-[calc(100vh-13rem)]">
				{filteredQuestions.map((question) => (
					<div
						key={question.id}
						onClick={() => onSelectQuestion(question.id)}
						className={`p-3 border-b border-gray-100 flex items-center cursor-pointer hover:bg-gray-50 ${
							selectedQuestionId === question.id
								? "bg-gray-100"
								: ""
						}`}
					>
						<div className="flex-1 min-w-0">
							<div className="flex items-center">
								<span
									className={`inline-block w-2 h-2 rounded-full mr-2 ${
										question.id <= 40
											? "bg-green-500"
											: question.id <= 70
											? "bg-yellow-500"
											: "bg-blue-700"
									}`}
								></span>
								<span className="text-sm font-medium truncate">
									{question.id}. {question.title}
								</span>
							</div>
							<div className="flex mt-1 gap-1 flex-wrap">
								<span
									className={`px-2 py-0.5 text-xs font-medium rounded-md ${
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
								<span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-md">
									{question.id <= 40
										? "10 pts"
										: question.id <= 70
										? "20 pts"
										: "30 pts"}
								</span>
							</div>
						</div>
						<div className="ml-2">
							{question?.status === "completed" ? (
								<div className="w-[18px] h-[18px] rounded-full bg-[#3ECF8E] flex items-center justify-center">
									<svg
										width="10"
										height="8"
										viewBox="0 0 12 10"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M1 5L4.5 8.5L11 1.5"
											stroke="white"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
							) : (
								<CircleIcon
									size={18}
									className="text-gray-300"
								/>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
