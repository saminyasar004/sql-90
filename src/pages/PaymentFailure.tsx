import { useNavigate } from "react-router-dom";
import { XCircle, ChevronLeft, RefreshCcw } from "lucide-react";

export default function PaymentFailure() {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
			<div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center border border-gray-100">
				<div className="flex justify-center mb-6">
					<div className="bg-red-100 p-4 rounded-full">
						<XCircle className="h-16 w-16 text-red-600" />
					</div>
				</div>

				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					Payment Failed
				</h1>
				<p className="text-gray-600 mb-8 leading-relaxed">
					We couldn't process your payment. This could be due to a
					technical issue or insufficient funds. Please try again or
					contact support if the issue persists.
				</p>

				<div className="space-y-4">
					<button
						onClick={() => navigate("/")}
						className="w-full flex items-center justify-center gap-2 bg-[#007C7C] hover:bg-[#006666] text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#007C7C]/20"
					>
						<RefreshCcw className="h-5 w-5" />
						Try Again
					</button>

					<button
						onClick={() => navigate("/")}
						className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-xl border-2 border-gray-100 transition-all"
					>
						<ChevronLeft className="h-5 w-5" />
						Back to Home
					</button>
				</div>
			</div>

			<div className="mt-8 text-gray-400 text-sm">
				SQL-90 &copy; 2025. All rights reserved.
			</div>
		</div>
	);
}
