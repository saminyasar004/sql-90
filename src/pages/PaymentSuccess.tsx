import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import { baseURL } from "@/config/dotenv";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export default function PaymentSuccess() {
	const navigate = useNavigate();
	const { refreshUserInfo } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const syncUserInfo = async () => {
			try {
				await refreshUserInfo();
				toast.success("Subscription updated successfully!");
			} catch (error) {
				console.error("Error syncing user info:", error);
				toast.error("An error occurred while syncing your account.");
			} finally {
				setLoading(false);
			}
		};

		syncUserInfo();
	}, [refreshUserInfo]);

	if (loading) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
				<Loader2 className="h-12 w-12 text-[#007C7C] animate-spin mb-4" />
				<h2 className="text-xl font-semibold text-gray-800">
					Verifying your subscription...
				</h2>
				<p className="text-gray-500 mt-2">
					Please wait a moment while we update your account.
				</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
			<div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center border border-gray-100">
				<div className="flex justify-center mb-6">
					<div className="bg-green-100 p-4 rounded-full">
						<CheckCircle2 className="h-16 w-16 text-green-600" />
					</div>
				</div>

				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					Payment Successful!
				</h1>
				<p className="text-gray-600 mb-8 leading-relaxed">
					Payment successful! All solutions have been unlocked for
					your account. You now have full access to all features.
					Thank you!
				</p>

				<div className="space-y-4">
					<button
						onClick={() => navigate("/")}
						className="w-full flex items-center justify-center gap-2 bg-[#007C7C] hover:bg-[#006666] text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#007C7C]/20"
					>
						Back to Practice
						<ChevronRight className="h-5 w-5" />
					</button>

					<p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
						Happy Coding!
					</p>
				</div>
			</div>

			<div className="mt-8 text-gray-400 text-sm">
				SQL90 &copy; 2025. All rights reserved.
			</div>
		</div>
	);
}
