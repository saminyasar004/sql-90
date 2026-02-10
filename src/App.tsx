import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./hooks/use-auth";
import Auth from "./pages/Auth";
import PasswordResetConfirm from "./pages/PasswordResetConfirm";
import NotFound from "./pages/NotFound";
import Index from "./pages";
import { GameProvider } from "./hooks/use-game";
import { QuestionProvider } from "./hooks/use-question";
import PrivacyPage from "./pages/PrivacyPolicy";
import TermsPage from "./pages/Terms";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import CertificatePublicView from "./pages/CertificatePublicView";
import CertificateVerificationView from "./pages/CertificateVerificationView";
import { DesktopViewSuggestionModal } from "@/components/common/desktopViewSuggestion";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
	const location = useLocation();
	const [showDesktopViewSuggestionModal, setShowDesktopViewSuggestionModal] =
		useState(false);

	// 🔥 Only show the DesktopViewSuggestionModal on small/mobile screens
	useEffect(() => {
		const checkScreenSize = () => {
			// Exempt certificate pages from desktop view suggestion
			const isCertificatePage =
				location.pathname.startsWith("/verify/") ||
				location.pathname.startsWith("/certificate/");

			if (window.innerWidth < 768 && !isCertificatePage) {
				setShowDesktopViewSuggestionModal(true);
			} else {
				setShowDesktopViewSuggestionModal(false);
			}
		};

		checkScreenSize(); // run on mount
		window.addEventListener("resize", checkScreenSize);

		return () => window.removeEventListener("resize", checkScreenSize);
	}, [location.pathname]);

	return (
		<>
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
				<Route
					path="/auth/password-reset/confirm/:uidb64/:token/"
					element={
						<AuthProvider>
							<PasswordResetConfirm />
						</AuthProvider>
					}
				/>
				<Route path="/privacy" element={<PrivacyPage />} />
				<Route path="/terms" element={<TermsPage />} />
				<Route
					path="/payment-success"
					element={
						<AuthProvider>
							<PaymentSuccess />
						</AuthProvider>
					}
				/>
				<Route
					path="/payment-failure"
					element={
						<AuthProvider>
							<PaymentFailure />
						</AuthProvider>
					}
				/>
				<Route
					path="/certificate/:certId"
					element={<CertificatePublicView />}
				/>
				<Route
					path="/verify/:certId"
					element={<CertificateVerificationView />}
				/>
				{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
				<Route path="*" element={<NotFound />} />
			</Routes>
			{/* 👇 Show only on mobile screens */}
			{showDesktopViewSuggestionModal && <DesktopViewSuggestionModal />}
		</>
	);
};

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<Toaster />
				<BrowserRouter>
					<AppContent />
				</BrowserRouter>
			</TooltipProvider>
		</QueryClientProvider>
	);
};

export default App;
