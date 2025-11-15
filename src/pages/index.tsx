import { Logo } from "@/components/common/logo";
import { ProgressBar } from "@/components/common/progress-bar";
import { GameProvider, useGame } from "@/hooks/use-game";
import { useState, useEffect } from "react";
import { QuestionView } from "./QuestionView";
import { Navigation } from "@/components/common/navigation";
import { Leaderboard } from "./Leaderboard";
import { CheckoutModal } from "@/components/common/checkout-modal";
import { ToastContainer } from "@/components/common/toast";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { LeaderboardProvider } from "@/hooks/use-leaderboard";
import { DesktopViewSuggestionModal } from "@/components/common/desktopViewSuggestion";

export default function Index() {
	const [activeView, setActiveView] = useState("questions");
	const [selectedQuestionId, setSelectedQuestionId] = useState(1);
	const [showCheckoutModal, setShowCheckoutModal] = useState(false);
	const [showDesktopViewSuggestionModal, setShowDesktopViewSuggestionModal] =
		useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const { toasts, removeToast } = useGame();
	const { isAuthenticated, logout } = useAuth();

	// 🔥 Only show the DesktopViewSuggestionModal on small/mobile screens
	useEffect(() => {
		const checkScreenSize = () => {
			if (window.innerWidth < 768) {
				setShowDesktopViewSuggestionModal(true);
			} else {
				setShowDesktopViewSuggestionModal(false);
			}
		};

		checkScreenSize(); // run on mount
		window.addEventListener("resize", checkScreenSize);

		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	// if (!isAuthenticated) return <Navigate to="/auth" replace />;

	return (
		<div className="min-h-screen bg-white">
			{/* Header */}
			<header className="bg-[#007C7C] text-white py-3 shadow-sm">
				<div className="container mx-auto flex items-center justify-between">
					<Logo />

					{/* Mobile menu button */}
					<button
						className="md:hidden rounded-md p-2 hover:bg-[#006666] focus:outline-none"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16m-7 6h7"
							/>
						</svg>
					</button>

					{/* Desktop navigation */}
					<div className="hidden md:flex items-center space-x-4">
						<button
							onClick={() => setActiveView("questions")}
							className={`px-4 py-2 rounded-md transition-colors ${
								activeView === "questions"
									? "bg-white text-[#008080] font-medium"
									: "text-white hover:bg-[#006666]"
							}`}
						>
							Practice
						</button>

						{isAuthenticated && (
							<button
								onClick={() => setActiveView("leaderboard")}
								className={`px-4 py-2 rounded-md transition-colors ${
									activeView === "leaderboard"
										? "bg-white text-[#008080] font-medium"
										: "text-white hover:bg-[#006666]"
								}`}
							>
								Leaderboard
							</button>
						)}

						{isAuthenticated && (
							<button
								onClick={() => setShowCheckoutModal(true)}
								className="ml-4 px-4 py-2 bg-[#40D693] text-white rounded-md font-medium hover:bg-[#35b47c] transition-colors"
							>
								Unlock Solutions 🔒
							</button>
						)}

						{!isAuthenticated ? (
							<Link to={"/auth"}>
								<button className="px-4 py-2 text-white rounded-md font-medium hover:bg-[#006666] transition-colors">
									Sign In
								</button>
							</Link>
						) : (
							<button
								onClick={logout}
								className="px-4 py-2 text-white rounded-md font-medium bg-warning hover:bg-warning/80 transition-colors"
							>
								Logout
							</button>
						)}
					</div>

					{/* Mobile menu dropdown */}
					{mobileMenuOpen && (
						<div className="w-full md:hidden mt-4 flex flex-col space-y-2">
							<button
								onClick={() => {
									setActiveView("questions");
									setMobileMenuOpen(false);
								}}
								className={`px-4 py-2 rounded-md transition-colors text-center ${
									activeView === "questions"
										? "bg-white text-[#008080] font-medium"
										: "text-white hover:bg-[#006666]"
								}`}
							>
								Practice
							</button>

							{isAuthenticated && (
								<button
									onClick={() => {
										setActiveView("leaderboard");
										setMobileMenuOpen(false);
									}}
									className={`px-4 py-2 rounded-md transition-colors text-center ${
										activeView === "leaderboard"
											? "bg-white text-[#008080] font-medium"
											: "text-white hover:bg-[#006666]"
									}`}
								>
									Leaderboard
								</button>
							)}

							{!isAuthenticated && (
								<Link to={"/auth"}>
									<button className="px-4 py-2 text-white rounded-md font-medium hover:bg-[#006666] transition-colors text-center">
										Sign In
									</button>
								</Link>
							)}

							{isAuthenticated && (
								<button
									onClick={() => {
										setShowCheckoutModal(true);
										setMobileMenuOpen(false);
									}}
									className="px-4 py-2 bg-[#40D693] text-white rounded-md font-medium hover:bg-[#35b47c] transition-colors text-center"
								>
									Unlock Solutions 🔒
								</button>
							)}
						</div>
					)}
				</div>
			</header>

			{/* Progress bar */}
			{activeView === "questions" && (
				<ProgressBar onSelectQuestion={setSelectedQuestionId} />
			)}

			{/* Main content */}
			<div className="flex flex-1 overflow-x-hidden">
				{activeView === "questions" ? (
					<div className="container w-full mx-auto flex flex-1 flex-col md:flex-row h-full">
						<div className="flex-1 md:order-2 overflow-auto h-full">
							<QuestionView
								questionId={selectedQuestionId}
								onShowCheckout={() =>
									setShowCheckoutModal(true)
								}
								onSelectQuestion={setSelectedQuestionId}
							/>
						</div>
						<div className="md:order-1 md:h-full">
							<Navigation
								selectedQuestionId={selectedQuestionId}
								onSelectQuestion={setSelectedQuestionId}
							/>
						</div>
					</div>
				) : (
					<div className="w-full overflow-auto">
						<LeaderboardProvider>
							<Leaderboard setActiveView={setActiveView} />
						</LeaderboardProvider>
					</div>
				)}
			</div>

			{/* Modals */}
			{showCheckoutModal && (
				<CheckoutModal onClose={() => setShowCheckoutModal(false)} />
			)}

			{/* 👇 Show only on mobile screens */}
			{showDesktopViewSuggestionModal && (
				<DesktopViewSuggestionModal
					onClose={() => setShowDesktopViewSuggestionModal(false)}
				/>
			)}

			{/* Toasts */}
			<ToastContainer toasts={toasts} removeToast={removeToast} />
		</div>
	);
}
