import { XIcon, CheckIcon } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function CheckoutModal({ onClose }: { onClose: () => void }) {
	const { logout } = useAuth();
	const token = localStorage.getItem("accessToken");
	// Function to handle payment
	const handlePayment = async () => {
		try {
			const response = await fetch(
				"https://admin.sql90.com/api/payments/create-checkout-session/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`, // Add this!
					},
					body: JSON.stringify({
						// You can pass extra info here if needed
						price: 9.49,
						currency: "usd",
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to create checkout session");
			}

			const data = await response.json();

			// Assuming the backend returns { url: "https://checkout.stripe.com/..." }
			if (data.url) {
				logout();
				window.location.href = data.url; // Redirect to Stripe checkout
			} else {
				console.error("Checkout URL not returned from backend");
			}
		} catch (error) {
			console.error("Payment error:", error);
			alert("Failed to initiate payment. Please try again.");
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
				{/* Modal header */}
				<div className="flex justify-between items-center p-6 border-b">
					<h2 className="text-2xl font-bold text-gray-900">
						Unlock All Solutions
					</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<XIcon size={24} />
					</button>
				</div>
				{/* Modal content */}
				<div className="p-6">
					{/* What you'll get section */}
					<div className="bg-[#007C7C]/10 p-6 rounded-md mb-6">
						<h3 className="text-xl font-bold text-[#007C7C] mb-4">
							What you'll get:
						</h3>
						<ul className="space-y-3">
							{[
								"Access to all 90 detailed solutions",
								"Detailed explanations",
								"Alternative approaches",
								"Performance optimization tips",
							].map((item) => (
								<li key={item} className="flex items-start">
									<CheckIcon
										size={20}
										className="text-[#007C7C] mr-2 mt-0.5 flex-shrink-0"
									/>
									<span className="text-[#007C7C]">
										{item}
									</span>
								</li>
							))}
						</ul>
					</div>
					{/* Payment details */}
					<div className="mb-6 flex justify-between items-center">
						<h3 className="text-xl font-medium text-gray-700">
							One-time payment
						</h3>
						<span className="text-3xl font-bold">$9.49</span>
					</div>
					{/* Payment form */}
					<form
						className="space-y-4"
						onSubmit={(e) => e.preventDefault()}
					>
						<button
							type="button"
							onClick={handlePayment}
							className="w-full py-3 px-4 bg-[#007C7C] hover:bg-[#006666] text-white font-medium rounded-md transition-colors"
						>
							Pay $9.49 and Unlock All Solutions
						</button>
						<p className="text-center text-gray-500 text-sm">
							Your payment is secure and processed via Stripe.
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}
