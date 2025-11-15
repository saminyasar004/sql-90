import { useAuth } from "@/hooks/use-auth";
import { useGame } from "@/hooks/use-game";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { SearchIcon, TrophyIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Leaderboard({ setActiveView }) {
	const [searchQuery, setSearchQuery] = useState("");
	const { leaderboard, loading, error } = useLeaderboard();

	const {
		completedPercentage,
		completedQuestions,
		totalPoints,
		accuracy,
		your_position,
	} = useGame();

	const filteredData = leaderboard.filter((user) =>
		user.username.toLowerCase().includes(searchQuery.toLowerCase())
	);
	const renderRank = (rank: number) => {
		if (rank === 1) {
			return (
				<div className="flex items-center justify-center gap-2">
					<TrophyIcon size={20} className="text-yellow-500" />
					<span className="text-base text-foreground">#{rank}</span>
				</div>
			);
		} else if (rank === 2) {
			return (
				<div className="flex items-center justify-center gap-2">
					<TrophyIcon size={20} className="text-gray-400" />
					<span className="text-base text-foreground">#{rank}</span>
				</div>
			);
		} else if (rank === 3) {
			return (
				<div className="flex items-center justify-center gap-2">
					<TrophyIcon size={20} className="text-amber-700" />
					<span className="text-base text-foreground">#{rank}</span>
				</div>
			);
		} else {
			return <div className="text-center">{rank}</div>;
		}
	};
	return (
		<div className="container w-full mx-auto px-4 py-6 pb-20">
			<div className="flex flex-col sm:flex-row sm:items-start mb-6 gap-4">
				<div className="mr-auto">
					<div className="flex items-center gap-3">
						<TrophyIcon size={32} className="text-yellow-500" />
						<h1 className="text-3xl font-bold text-gray-800">
							Leaderboard
						</h1>
					</div>
					<p className="text-gray-600 mt-1">
						See who's mastering SQL the fastest
					</p>
				</div>
				<div className="relative w-full sm:w-auto">
					<div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
						<SearchIcon size={16} className="text-gray-400" />
					</div>
					<input
						type="text"
						placeholder="Search users..."
						className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent w-full"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>
			{/* Your Position - moved above the leaderboard table */}
			<div className="mb-8">
				<h2 className="text-lg font-semibold text-gray-700 mb-3">
					Your Position
				</h2>
				<div className="bg-green-50 rounded-lg border border-green-100 p-4">
					{/* Mobile view for "Your Position" */}
					<div className="flex sm:hidden flex-col gap-2">
						<div className="flex justify-between items-center">
							<div className="flex items-center gap-2">
								<div className="text-center text-xl font-bold text-gray-700">
									{renderRank(your_position)}
								</div>
								<span className="font-medium text-gray-900">
									You
								</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="font-medium text-gray-900">
									{totalPoints} pts
								</span>
								<div className="font-medium text-green-600">
									{accuracy}%
								</div>
							</div>
						</div>
						<div className="flex flex-col w-full mt-1">
							<div className="text-sm text-gray-700 mb-1">
								Completed: {completedQuestions} / 90
							</div>
							<div className="w-full bg-gray-100 rounded-full h-2.5">
								<div
									className="bg-[#008080] h-2.5 rounded-full"
									style={{
										width: `${
											(completedPercentage / 90) * 100
										}%`,
									}}
								></div>
							</div>
						</div>
					</div>
					{/* Desktop view for "Your Position" */}
					<div className="hidden sm:grid sm:grid-cols-6">
						<div className="px-2 py-2 w-12 flex items-center justify-center">
							<div className="text-center text-xl font-bold text-gray-700">
								{renderRank(your_position)}
							</div>
						</div>
						<div className="px-2 py-2 flex items-center">
							<span className="font-medium text-gray-900">
								You
							</span>
						</div>
						<div className="px-3 py-2 flex items-center col-span-2">
							<div className="flex flex-col w-full">
								<div className="text-sm text-gray-700 mb-1">
									{completedQuestions} / 90
								</div>
								<div className="w-full bg-gray-100 rounded-full h-2.5">
									<div
										className="bg-[#008080] h-2.5 rounded-full"
										style={{
											width: `${
												(completedPercentage / 90) * 100
											}%`,
										}}
									></div>
								</div>
							</div>
						</div>
						<div className="px-3 py-2 text-right">
							<span className="font-medium text-gray-900">
								{totalPoints} pts
							</span>
						</div>
						<div className="px-3 py-2 text-right">
							<div className="font-medium text-green-600">
								{accuracy}%
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
				{/* Table header - visible only on larger screens */}
				<div className="hidden sm:grid grid-cols-6 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
					<div className="px-2 py-3 w-12 text-center">Rank</div>
					<div className="px-2 py-3 text-left">Name</div>
					<div className="px-3 py-3 text-left col-span-2">
						Completed
					</div>
					<div className="px-3 py-3 text-right">Points</div>
					<div className="px-3 py-3 text-right">Accuracy</div>
				</div>
				{/* Mobile-friendly list */}
				<div className="divide-y divide-gray-200">
					{filteredData.map((user, index) => (
						<div
							key={index}
							className="sm:grid sm:grid-cols-6 hover:bg-gray-50 transition-colors"
						>
							{/* Mobile view - card style */}
							<div className="flex sm:hidden flex-col p-4 gap-2">
								<div className="flex justify-between items-center">
									<div className="flex items-center gap-2">
										<div className="w-8 h-8 flex items-center justify-center">
											#{renderRank(index)}
										</div>
										<span className="font-medium text-gray-900">
											{user.username}
										</span>
									</div>
									<div className="flex items-center gap-2">
										<span className="font-medium text-gray-900">
											{user.points} pts
										</span>
										<span
											className={`font-medium ${
												user.accuracy >= 90
													? "text-green-600"
													: user.accuracy >= 80
													? "text-gray-900"
													: "text-orange-600"
											}`}
										>
											{user.accuracy}%
										</span>
									</div>
								</div>
								<div className="flex flex-col w-full mt-1">
									<div className="text-sm text-gray-700 mb-1">
										Completed: {user.completed_count} / 90
									</div>
									<div className="w-full bg-gray-100 rounded-full h-2.5">
										<div
											className="bg-[#008080] h-2.5 rounded-full"
											style={{
												width: `${
													(user.completed_count /
														90) *
													100
												}%`,
											}}
										></div>
									</div>
								</div>
							</div>
							{/* Desktop view */}
							<div className="hidden sm:flex px-2 py-4 w-12 items-center justify-center">
								{renderRank(++index)}
							</div>
							<div className="hidden sm:flex px-2 py-4 items-center">
								<span className="font-medium text-gray-900">
									{user.username}
								</span>
							</div>
							<div className="hidden sm:flex px-3 py-4 items-center col-span-2">
								<div className="flex flex-col w-full">
									<div className="text-sm text-gray-700 mb-1">
										{user.completed_count} / 90
									</div>
									<div className="w-full bg-gray-100 rounded-full h-2.5">
										<div
											className="bg-[#008080] h-2.5 rounded-full"
											style={{
												width: `${
													(user.completed_count /
														90) *
													100
												}%`,
											}}
										></div>
									</div>
								</div>
							</div>
							<div className="hidden sm:flex px-3 py-4 text-right items-center justify-end">
								<span className="font-medium text-gray-900">
									{user.points}
								</span>
							</div>
							<div className="hidden sm:flex px-3 py-4 text-right items-center justify-end">
								<span
									className={`font-medium ${
										user.accuracy >= 90
											? "text-green-600"
											: user.accuracy >= 80
											? "text-gray-900"
											: "text-orange-600"
									}`}
								>
									{user.accuracy}%
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="mt-10 text-center">
				<p className="text-lg font-medium text-gray-700">
					Ready to join the leaderboard?
				</p>
				<p className="mt-2 text-gray-600">
					Master SQL with 90 carefully crafted practice questions
				</p>
				<button
					onClick={() => setActiveView("questions")}
					className="mt-4 px-6 py-3 bg-[#008080] text-white rounded-md hover:bg-[#006666] transition-colors"
				>
					Start Practicing Now
				</button>
			</div>
		</div>
	);
}
