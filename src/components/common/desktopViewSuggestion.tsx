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
						We recommend using{" "}
						<span className="font-medium text-primary">SQL90</span>{" "}
						on a desktop or laptop. Give your practice the focus it
						deserves and switch over to a larger screen to make the
						most of it.
					</p>
				</div>
			</div>
		</div>
	);
}
