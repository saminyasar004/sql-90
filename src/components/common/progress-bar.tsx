import { useQuestion } from "@/hooks/use-question";
import { useGame } from "../../hooks/use-game";
export function ProgressBar({ onSelectQuestion }) {
	const { totalPoints, streak, completedPercentage, completedQuestions } =
		useGame();
	const { questions, isLoading, error } = useQuestion();
	return (
		<div className="w-full bg-white border-b border-gray-200">
			<div className="container mx-auto px-4 py-4">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2 sm:gap-0">
					<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
						{/* Streak counter */}
						<span className="text-sm font-medium text-gray-500">
							Your Progress
						</span>
						{streak > 0 && (
							<>
								<div className="flex items-center px-2 py-1 bg-orange-50 border border-orange-100 rounded-md">
									<span className="text-orange-600 text-sm font-medium">
										🔥 {streak} day streak
									</span>
								</div>
							</>
						)}
					</div>
					<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 w-full sm:w-auto">
						{/* Small inline progress bar - moved to be first */}
						<div className="w-full sm:w-40 h-2 bg-gray-100 rounded-full overflow-hidden mr-0 sm:mr-2">
							<div
								className="h-full bg-[#008080] rounded-full"
								style={{
									width: `${completedPercentage}%`,
								}}
							></div>
						</div>
						{/* Text moved to be after the progress bar */}
						<span className="text-sm font-medium">
							<span className="text-[#008080]">
								{Math.round(completedPercentage)}%
							</span>{" "}
							Complete ({completedQuestions}/90 Questions)
						</span>
						{/* Points display - moved to rightmost position */}
						<div className="flex items-center px-2 py-1 bg-[#00808010] border border-[#00808030] rounded-md ml-0 sm:ml-4 mt-2 sm:mt-0">
							<span className="text-[#008080] text-sm font-medium">
								{totalPoints} Points
							</span>
						</div>
					</div>
				</div>
				{/* Question circles - with fixed overflow handling */}
				<div className="w-full overflow-x-auto sm:overflow-x-hidden pb-2">
					<div className="w-full flex justify-center">
						<div className="flex flex-wrap items-center justify-around gap-[1px] w-full">
							{questions.map((question) => (
								<div
									key={question.id}
									className="relative group flex flex-col items-center"
									title={`${question.id}. ${
										question.title
									} (${
										question.id <= 40
											? "Easy"
											: question.id <= 70
											? "Intermediate"
											: "Hard"
									})`}
									onClick={() =>
										onSelectQuestion(question.id)
									}
									role="button"
									tabIndex={0}
									aria-label={`Go to question ${question.id}: ${question.title}`}
									onKeyDown={(e) => {
										if (
											e.key === "Enter" ||
											e.key === " "
										) {
											onSelectQuestion(question.id);
										}
									}}
									style={{
										outline: "none",
									}}
								>
									{question?.status === "completed" ? (
										<div
											className={`w-[9px] h-[9px] rounded-full cursor-pointer ${
												question.id <= 40
													? "bg-green-500"
													: question.id <= 70
													? "bg-yellow-500"
													: "bg-blue-700"
											}`}
										></div>
									) : (
										<div
											className="w-[9px] h-[9px] rounded-full cursor-pointer"
											style={{
												backgroundColor:
													question.id <= 40
														? "rgb(202, 227, 202)" // Between green-100 and green-200
														: question.id <= 70
														? "rgb(245, 233, 201)" // Between amber-100 and amber-200
														: "rgb(198, 221, 245)", // Between blue-100 and blue-200
											}}
										></div>
									)}
									{/* Small number below the circle */}
									<span className="text-[9px] text-gray-400 mt-[4px]">
										{question.id}
									</span>
									{/* Tooltip on hover */}
									<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 w-max max-w-xs bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
										{question.id}. {question.title} (
										{question.id <= 40
											? "Easy"
											: question.id <= 70
											? "Intermediate"
											: "Hard"}
										)
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			{/* Add global style to remove outline for all elements in this component */}
			{/* <style>{`
				.w-full.flex > div:focus {
					outline: none;
					box-shadow: none;
				}
			`}</style> */}
		</div>
	);
}
