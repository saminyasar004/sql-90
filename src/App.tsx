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

const queryClient = new QueryClient();

const App = () => (
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
					{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
