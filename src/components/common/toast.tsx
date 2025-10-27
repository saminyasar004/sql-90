import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";
export type ToastProps = {
	message: string;
	type?: "success" | "info";
	duration?: number;
	onClose?: () => void;
	visible: boolean;
};
export function Toast({
	message,
	type = "success",
	duration = 3000,
	onClose,
	visible,
}: ToastProps) {
	const [isVisible, setIsVisible] = useState(visible);
	useEffect(() => {
		setIsVisible(visible);
		if (visible) {
			const timer = setTimeout(() => {
				setIsVisible(false);
				if (onClose) onClose();
			}, duration);
			return () => clearTimeout(timer);
		}
	}, [visible, duration, onClose]);
	if (!isVisible) return null;
	return (
		<div className="fixed top-20 right-5 z-50 animate-slide-in">
			<div
				className={`rounded-lg shadow-lg p-4 flex items-center ${
					type === "success"
						? "bg-green-50 border border-green-200"
						: "bg-blue-50 border border-blue-200"
				} max-w-md`}
			>
				<div className="flex-1">
					<p
						className={`font-medium ${
							type === "success"
								? "text-green-800"
								: "text-blue-800"
						}`}
					>
						{message}
					</p>
				</div>
				<button
					onClick={() => {
						setIsVisible(false);
						if (onClose) onClose();
					}}
					className="ml-4 text-gray-400 hover:text-gray-600 focus:outline-none"
				>
					<XIcon size={16} />
				</button>
			</div>
		</div>
	);
}
export function ToastContainer({
	toasts,
	removeToast,
}: {
	toasts: Array<{
		id: string;
		message: string;
		type?: "success" | "info";
	}>;
	removeToast: (id: string) => void;
}) {
	return (
		<div className="fixed top-20 right-5 z-50 space-y-4">
			{toasts.map((toast) => (
				<Toast
					key={toast.id}
					message={toast.message}
					type={toast.type}
					visible={true}
					onClose={() => removeToast(toast.id)}
				/>
			))}
		</div>
	);
}
