import { XIcon, MonitorSmartphone } from "lucide-react";

export function DesktopViewSuggestionModal({
	onClose,
}: {
	onClose: () => void;
}) {
	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
			<div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-fadeIn">
				{/* Header */}
				<div className="w-full flex justify-between items-center p-5 border-b border-gray-100">
					<h2 className="text-lg w-full font-semibold text-gray-800 text-center">
						Better on Desktop
					</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 transition"
					>
						<XIcon size={22} />
					</button>
				</div>

				{/* Content */}
				<div className="p-6 flex flex-col items-center text-center space-y-4">
					<div className="p-3 bg-primary/10 rounded-full">
						<MonitorSmartphone size={42} className="text-primary" />
					</div>

					<h3 className="text-xl font-semibold text-gray-800">
						For the best experience
					</h3>

					<p className="text-gray-600 leading-relaxed text-sm">
						We recommend viewing this website from a{" "}
						<span className="font-medium text-primary">
							desktop or laptop
						</span>{" "}
						to enjoy the full layout and all available features.
						Some sections may not display properly on smaller
						screens.
					</p>

					<button
						onClick={onClose}
						className="mt-4 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-md font-medium transition-colors"
					>
						Got it
					</button>
				</div>
			</div>
		</div>
	);
}
