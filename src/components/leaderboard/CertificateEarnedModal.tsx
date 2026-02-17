import React, { useRef, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DownloadIcon, X } from "lucide-react";
import { CertificateTemplate } from "./CertificateTemplate";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { toast } from "sonner";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface CertificateEarnedModalProps {
	isOpen: boolean;
	onClose: () => void;
	name: string;
	earnedOn: string;
	certId: string;
}

export function CertificateEarnedModal({
	isOpen,
	onClose,
	name,
	earnedOn,
	certId,
}: CertificateEarnedModalProps) {
	const certificateRef = useRef<HTMLDivElement>(null);
	const [isDownloading, setIsDownloading] = useState(false);
	const { width, height } = useWindowSize();

	const handleDownload = async () => {
		if (!certificateRef.current) return;

		let toastId: string | number | undefined;

		try {
			setIsDownloading(true);
			toastId = toast.loading("Preparing your certificate...");

			if (document.fonts) {
				await document.fonts.ready;
			}

			await new Promise((resolve) => setTimeout(resolve, 200));

			const options = {
				quality: 1,
				pixelRatio: 2,
				backgroundColor: "#ffffff",
				style: {
					borderRadius: "0",
					margin: "0",
					padding: "0",
				},
				fontEmbedCSS: undefined,
				skipFonts: false,
			};

			const dataUrl = await toPng(certificateRef.current, options);

			const img = new Image();
			await new Promise<void>((resolve) => {
				img.onload = () => resolve();
				img.src = dataUrl;
			});

			const imgWidth = img.width;
			const imgHeight = img.height;

			const pdf = new jsPDF({
				orientation: "landscape",
				unit: "px",
				format: [imgWidth, imgHeight],
			});

			pdf.addImage(dataUrl, "PNG", 0, 0, imgWidth, imgHeight);
			pdf.save(`SQL90-Certificate-${name.replace(/\s+/g, "-")}.pdf`);

			toast.success("Certificate downloaded successfully!", {
				id: toastId,
			});
		} catch (err: any) {
			console.error("Download failed:", err);
			toast.error("Failed to download certificate. Please try again.", {
				id: toastId,
			});
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-transparent shadow-none sm:rounded-none [&>button]:hidden">
				{isOpen && (
					<Confetti
						width={width}
						height={height}
						recycle={false}
						numberOfPieces={500}
						gravity={0.1}
					/>
				)}
				<div className="relative bg-white rounded-3xl p-6 sm:p-10 shadow-2xl m-4 border border-teal-100 overflow-hidden">
					<div className="text-center mb-8">
						<div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal-50 mb-4 animate-bounce">
							<span className="text-4xl">🏆</span>
						</div>
						<DialogHeader>
							<DialogTitle className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
								Congratulations!
							</DialogTitle>
							<DialogDescription className="text-lg text-teal-700 font-medium">
								You have successfully completed all 90 SQL
								Practice Questions!
							</DialogDescription>
						</DialogHeader>
					</div>

					<div className="mb-8 transform transition-transform hover:scale-[1.02] duration-300">
						<CertificateTemplate
							ref={certificateRef}
							name={name}
							earnedOn={earnedOn}
							certId={certId}
							className="shadow-xl"
						/>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							onClick={handleDownload}
							disabled={isDownloading}
							className="bg-teal-600 hover:bg-teal-700 text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-teal-100"
						>
							<DownloadIcon className="mr-2 h-5 w-5" />
							{isDownloading
								? "Generating..."
								: "Download Certificate"}
						</Button>
						<Button
							variant="outline"
							onClick={onClose}
							className="border-gray-200 text-gray-600 font-bold h-12 px-8 rounded-xl"
						>
							Close & Continue
						</Button>
					</div>

					{/* Close Button */}
					<button
						onClick={onClose}
						className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-50"
					>
						<X size={20} />
					</button>

					<p className="text-center text-gray-400 text-xs mt-8">
						You can also view and download this certificate anytime
						on the leaderboard.
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
