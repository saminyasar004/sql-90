import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./hooks/use-auth";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Index from "./pages";
import { GameProvider } from "./hooks/use-game";
import { QuestionProvider } from "./hooks/use-question";
import PrivacyPage from "./pages/PrivacyPolicy";
import TermsPage from "./pages/Terms";
import { DesktopViewSuggestionModal } from "@/components/common/desktopViewSuggestion";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
	const [showDesktopViewSuggestionModal, setShowDesktopViewSuggestionModal] =
		useState(false);

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

	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<Toaster />
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={
								<AuthProvider>
									<QuestionProvider>
										<GameProvider>
											<Index />
										</GameProvider>
									</QuestionProvider>
								</AuthProvider>
							}
						/>
						<Route
							path="/auth"
							element={
								<AuthProvider>
									<Auth />
								</AuthProvider>
							}
						/>
						<Route path="/privacy" element={<PrivacyPage />} />
						<Route path="/terms" element={<TermsPage />} />
						{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
				{/* 👇 Show only on mobile screens */}
				{showDesktopViewSuggestionModal && (
					<DesktopViewSuggestionModal />
				)}
			</TooltipProvider>
		</QueryClientProvider>
	);
};

export default App;
