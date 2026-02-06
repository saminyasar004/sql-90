import { useAuth } from "@/hooks/use-auth";
import { useGame } from "@/hooks/use-game";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { formatUsername } from "@/lib/utils";

import {
	SearchIcon,
	TrophyIcon,
	PencilIcon,
	DownloadIcon,
	Share2Icon,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { CertificateCard } from "@/components/leaderboard/certificate-card";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function Leaderboard({ setActiveView }) {
	const [searchQuery, setSearchQuery] = useState("");
	const { leaderboard, loading, error } = useLeaderboard();
	const { deleteAccount } = useAuth();
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const [showProfile, setShowProfile] = useState(() => {
		const saved = localStorage.getItem("showProfileOnLeaderboard");
		return saved === null ? true : saved === "true";
	});

	const handleToggleProfile = (checked: boolean) => {
		setShowProfile(checked);
		localStorage.setItem("showProfileOnLeaderboard", String(checked));
	};

	const {
		completedPercentage,
		completedQuestions,
		totalPoints,
		accuracy,
		your_position,
	} = useGame();

	const rankedLeaderboard = useMemo(() => {
		const sorted = [...leaderboard].sort((a, b) => b.points - a.points);
		let currentRank = 1;
		return sorted.map((user, index) => {
			if (index > 0 && user.points < sorted[index - 1].points) {
				currentRank = index + 1;
			}
			return { ...user, rank: currentRank };
		});
	}, [leaderboard]);

	const filteredData = rankedLeaderboard.filter((user) =>
		formatUsername(user.username)
			.toLowerCase()
			.includes(searchQuery.toLowerCase()),
	);

	const currentUsername = localStorage.getItem("username");
	const currentUserRank = useMemo(() => {
		if (!currentUsername) return null;
		const user = rankedLeaderboard.find(
			(u) => u.username === currentUsername,
		);
		return user ? user.rank : null;
	}, [rankedLeaderboard, currentUsername]);

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

	const handleDeleteAccount = async () => {
		await deleteAccount();
		setIsDeleteDialogOpen(false);
	};

	return (
		<>
			<AlertDialog
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
			>
				<AlertDialogContent className="bg-white border-[#DCFCE7] rounded-3xl p-8 max-w-md">
					<AlertDialogHeader>
						<div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-2">
							<span
								className="text-2xl"
								role="img"
								aria-label="warning"
							>
								⚠️
							</span>
						</div>
						<AlertDialogTitle className="text-2xl font-bold text-[#1E293B]">
							Delete Account
						</AlertDialogTitle>
						<AlertDialogDescription className="text-[#64748B] text-base font-medium">
							Are you sure you want to delete your account? This
							action is permanent and will remove all your
							progress and leaderboard rankings.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="mt-8 gap-3 sm:gap-0">
						<AlertDialogCancel className="flex-1 bg-white border-2 border-gray-100 text-[#64748B] hover:bg-gray-50 py-6 rounded-xl font-bold">
							No, keep it
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeleteAccount}
							className="flex-1 bg-red-500 hover:bg-red-600 text-white py-6 rounded-xl font-bold"
						>
							Yes, delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

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
					<div className="flex flex-col items-end gap-3 w-full sm:w-auto">
						<div className="flex items-center gap-4 text-sm text-gray-500 font-medium mr-1">
							<button className="hover:text-gray-800 transition-colors">
								Change Password
							</button>
							<span className="text-gray-300">|</span>
							<button
								onClick={() => setIsDeleteDialogOpen(true)}
								className="hover:text-red-600 transition-colors"
							>
								Delete Account
							</button>
						</div>
						<div className="relative w-full">
							<div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
								<SearchIcon
									size={16}
									className="text-gray-400"
								/>
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
				</div>

				{/* Your Certificate Section - Only show if completed all 90 questions */}
				{/* {completedQuestions === 90 && */}
				{
					<div className="mb-8 font-sans">
						<h2 className="text-xl font-bold text-[#1E293B] mb-4">
							Your Certificate
						</h2>
						<CertificateCard />
					</div>
				}
				{/* Your Position - moved above the leaderboard table */}
				<div className="mb-8 font-sans">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
						<h2 className="text-xl font-bold text-[#1E293B]">
							Your Position
						</h2>
						<div className="flex items-center gap-3">
							<span className="text-sm text-[#64748B] font-medium whitespace-nowrap">
								Show my profile on leaderboard
							</span>
							<button
								onClick={() =>
									handleToggleProfile(!showProfile)
								}
								className={cn(
									"relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:ring-offset-2",
									showProfile
										? "bg-[#007C7C]"
										: "bg-[#E2E8F0]",
								)}
							>
								<span
									className={cn(
										"inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out",
										showProfile
											? "translate-x-6"
											: "translate-x-1",
									)}
								/>
							</button>
						</div>
					</div>

					<div className="bg-[#F0FDF4] rounded-xl border border-[#DCFCE7] p-6 shadow-sm">
						{/* Mobile view for "Your Position" */}
						<div className="flex sm:hidden flex-col gap-5">
							<div className="flex justify-between items-center">
								<div className="flex items-center gap-4">
									<div className="text-2xl font-bold text-[#334155]">
										{currentUserRank || your_position}
									</div>
									<div className="flex flex-col">
										<span className="font-semibold text-[#1E293B]">
											You (
											{showProfile
												? formatUsername(
														localStorage.getItem(
															"username",
														),
													)
												: "Anonymous"}
											)
										</span>
									</div>
								</div>
								<div className="flex flex-col items-end">
									<span className="font-bold text-[#1E293B]">
										{totalPoints}
									</span>
									<div className="font-bold text-[#22C55E]">
										{accuracy}%
									</div>
								</div>
							</div>
							<div className="flex flex-col w-full">
								<div className="text-xs font-semibold text-[#64748B] mb-2 flex justify-between">
									<span>{completedQuestions} / 90</span>
								</div>
								<div className="w-full bg-[#E2E8F0] rounded-full h-2">
									<div
										className="bg-[#007C7C] h-2 rounded-full transition-all duration-700 ease-out shadow-sm"
										style={{
											width: `${completedPercentage}%`,
										}}
									></div>
								</div>
							</div>
						</div>
						{/* Desktop view for "Your Position" */}
						<div className="hidden sm:grid sm:grid-cols-6 items-center">
							<div className="px-2 flex items-center justify-center">
								<div className="text-2xl font-bold text-[#334155]">
									{currentUserRank || your_position}
								</div>
							</div>
							<div className="px-4 flex items-center">
								<span className="font-semibold text-[#1E293B]">
									You (
									{showProfile
										? formatUsername(
												localStorage.getItem(
													"username",
												),
											)
										: "Anonymous"}
									)
								</span>
							</div>
							<div className="px-4 flex items-center col-span-2">
								<div className="flex flex-col w-full px-4">
									<div className="text-xs font-semibold text-[#64748B] mb-1.5">
										{completedQuestions} / 90
									</div>
									<div className="w-full bg-[#E2E8F0] rounded-full h-2.5 overflow-hidden">
										<div
											className="bg-[#007C7C] h-2.5 rounded-full transition-all duration-700 ease-out"
											style={{
												width: `${completedPercentage}%`,
											}}
										></div>
									</div>
								</div>
							</div>
							<div className="px-4 text-right">
								<span className="text-xl font-bold text-[#1E293B]">
									{totalPoints}
								</span>
							</div>
							<div className="px-4 text-right">
								<div className="text-xl font-bold text-[#22C55E]">
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
												#{renderRank(user.rank)}
											</div>
											<span className="font-medium text-gray-900">
												{formatUsername(user.username)}
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
											Completed: {user.completed_count} /
											90
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
									{renderRank(user.rank)}
								</div>
								<div className="hidden sm:flex px-2 py-4 items-center">
									<span className="font-medium text-gray-900">
										{formatUsername(user.username)}
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
		</>
	);
}
