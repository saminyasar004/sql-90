import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import {
	DownloadIcon,
	Share2Icon,
	PencilIcon,
	CheckIcon,
	XIcon,
	Database,
} from "lucide-react";
import { useGame } from "@/hooks/use-game";
import { useEffect } from "react";
import { toast } from "sonner";

export function CertificateCard() {
	const {
		certificateData,
		fetchCertificateAndBadges,
		updateCertificateName,
	} = useGame();

	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState("");
	const [isDownloading, setIsDownloading] = useState(false);
	const certificateRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!certificateData) {
			fetchCertificateAndBadges();
		}
	}, []);

	useEffect(() => {
		if (
			certificateData?.full_name ||
			certificateData?.name_on_certificate
		) {
			setEditValue(
				certificateData.full_name ||
					certificateData.name_on_certificate,
			);
		}
	}, [certificateData]);

	const name =
		certificateData?.full_name ||
		certificateData?.name_on_certificate ||
		"Your Name";
	const certId = certificateData?.certificate_id || "LOADING...";
	const earnedOn = certificateData?.certificate_earned_on
		? new Date(certificateData.certificate_earned_on).toLocaleDateString(
				"en-US",
				{
					year: "numeric",
					month: "long",
					day: "numeric",
				},
			)
		: "Not yet earned";

	const handleSaveName = async () => {
		const success = await updateCertificateName(editValue);
		if (success) {
			toast.success("Certificate name updated successfully");
			setIsEditing(false);
		} else {
			toast.error("Failed to update certificate name");
		}
	};

	const handleCancelEdit = () => {
		setEditValue(name);
		setIsEditing(false);
	};

	const handleDownload = async () => {
		if (!certificateRef.current) return;

		try {
			setIsDownloading(true);
			const toastId = toast.loading("Preparing your certificate...");

			// Wait for fonts to be ready
			if (document.fonts) {
				await document.fonts.ready;
			}

			// Small delay to ensure any layout shifts or font renders are stable
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
				// Add defensive options for potential font embedding issues
				fontEmbedCSS: undefined, // Let it try default first, or set to empty string if it fails
				skipFonts: false, // Keep fonts by default with the downgraded version
			};

			const dataUrl = await toPng(certificateRef.current, options);

			const link = document.createElement("a");
			link.download = `SQL90-Certificate-${name.replace(/\s+/g, "-")}.png`;
			link.href = dataUrl;
			link.click();

			toast.success("Certificate downloaded successfully!", {
				id: toastId,
			});
		} catch (err: any) {
			console.error("Download failed:", err);

			// If it fails with font issue, try once more with skipFonts
			if (
				err.message?.includes("trim") ||
				err.message?.includes("font")
			) {
				try {
					const dataUrl = await toPng(certificateRef.current!, {
						quality: 1,
						pixelRatio: 2,
						backgroundColor: "#ffffff",
						skipFonts: true,
					});
					const link = document.createElement("a");
					link.download = `SQL90-Certificate-${name.replace(/\s+/g, "-")}.png`;
					link.href = dataUrl;
					link.click();
					toast.success(
						"Certificate downloaded (system fonts used).",
					);
					return;
				} catch (retryErr) {
					toast.error(
						"Failed to download certificate. Please try again.",
					);
				}
			} else {
				toast.error(
					"Failed to download certificate. Please try again.",
				);
			}
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg border-2 border-teal-200 p-6 mb-8">
			{/* Celebration Header */}
			<div className="flex items-start gap-4 mb-4">
				<div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
					<span
						className="text-2xl"
						role="img"
						aria-label="party popper"
					>
						🎉
					</span>
				</div>
				<div className="flex-1">
					<h2 className="text-xl font-bold text-gray-800 mb-1">
						Congratulations! You've completed all 90 questions!
					</h2>
					<p className="text-gray-600 text-sm">
						Download or share your certificate of completion
					</p>
				</div>
			</div>

			{/* Certificate Preview Container */}
			<div className="flex justify-center mb-4">
				<div
					ref={certificateRef}
					className="relative bg-white rounded-lg border-2 border-gray-200 p-8 sm:p-10 shadow-sm w-full max-w-5xl overflow-hidden"
				>
					{/* Background Watermarks */}
					<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
						<div className="flex items-center opacity-[0.03] select-none">
							<span className="text-[10rem] font-bold text-teal-600">
								SQL
							</span>
							<span className="text-[10rem] font-bold text-green-500">
								90
							</span>
						</div>
					</div>

					{/* Database Icons in Corners */}
					<div className="absolute top-12 left-12 opacity-[0.04] pointer-events-none">
						<Database size={40} className="text-teal-600" />
					</div>
					<div className="absolute top-12 right-12 opacity-[0.04] pointer-events-none">
						<Database size={40} className="text-teal-600" />
					</div>
					<div className="absolute bottom-12 left-12 opacity-[0.04] pointer-events-none">
						<Database size={40} className="text-teal-600" />
					</div>
					<div className="absolute bottom-12 right-12 opacity-[0.04] pointer-events-none">
						<Database size={40} className="text-teal-600" />
					</div>

					{/* SQL Query Watermarks */}
					<div className="absolute top-1/4 left-8 opacity-[0.025] pointer-events-none select-none font-mono text-xs text-teal-800 -rotate-12">
						SELECT * FROM achievements
					</div>
					<div className="absolute bottom-1/4 right-8 opacity-[0.025] pointer-events-none select-none font-mono text-xs text-teal-800 rotate-12">
						JOIN skills ON mastery = 100
					</div>
					<div className="absolute top-1/3 right-1/4 opacity-[0.02] pointer-events-none select-none font-mono text-[10px] text-teal-800 rotate-6">
						WHERE completed = TRUE
					</div>
					<div className="absolute bottom-1/3 left-1/4 opacity-[0.02] pointer-events-none select-none font-mono text-[10px] text-teal-800 -rotate-6">
						ORDER BY excellence DESC
					</div>

					{/* Decorative Corners */}
					{/* Top Left */}
					<div className="absolute top-0 left-0 pointer-events-none">
						<div className="absolute top-4 left-4 w-24 h-1 bg-teal-600 rounded-full"></div>
						<div className="absolute top-4 left-4 w-1 h-24 bg-teal-600 rounded-full"></div>
						<div className="absolute top-8 left-8 w-16 h-0.5 bg-green-300 rounded-full"></div>
						<div className="absolute top-8 left-8 w-0.5 h-16 bg-green-300 rounded-full"></div>
					</div>
					{/* Top Right */}
					<div className="absolute top-0 right-0 pointer-events-none">
						<div className="absolute top-4 right-4 w-24 h-1 bg-teal-600 rounded-full"></div>
						<div className="absolute top-4 right-4 w-1 h-24 bg-teal-600 rounded-full"></div>
						<div className="absolute top-8 right-8 w-16 h-0.5 bg-green-300 rounded-full"></div>
						<div className="absolute top-8 right-8 w-0.5 h-16 bg-green-300 rounded-full"></div>
					</div>
					{/* Bottom Left */}
					<div className="absolute bottom-0 left-0 pointer-events-none">
						<div className="absolute bottom-4 left-4 w-24 h-1 bg-teal-600 rounded-full"></div>
						<div className="absolute bottom-4 left-4 w-1 h-24 bg-teal-600 rounded-full"></div>
						<div className="absolute bottom-8 left-8 w-16 h-0.5 bg-green-300 rounded-full"></div>
						<div className="absolute bottom-8 left-8 w-0.5 h-16 bg-green-300 rounded-full"></div>
					</div>
					{/* Bottom Right */}
					<div className="absolute bottom-0 right-0 pointer-events-none">
						<div className="absolute bottom-4 right-4 w-24 h-1 bg-teal-600 rounded-full"></div>
						<div className="absolute bottom-4 right-4 w-1 h-24 bg-teal-600 rounded-full"></div>
						<div className="absolute bottom-8 right-8 w-16 h-0.5 bg-green-300 rounded-full"></div>
						<div className="absolute bottom-8 right-8 w-0.5 h-16 bg-green-300 rounded-full"></div>
					</div>

					{/* Certificate Body */}
					<div className="text-center relative z-10">
						<div className="mb-6">
							<div className="inline-flex items-center justify-center mb-4">
								<span className="text-4xl font-bold text-teal-600">
									SQL
								</span>
								<span className="text-4xl font-bold text-green-500">
									90
								</span>
							</div>
							<h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
								Certificate of Completion
							</h3>
							<div className="w-24 h-1 bg-teal-500 mx-auto rounded-full"></div>
						</div>

						<div className="mb-8">
							<p className="text-gray-600 mb-4">
								This certifies that
							</p>
							<p className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 px-4">
								{name}
							</p>
							<p className="text-gray-600 mb-2">
								has successfully completed all
							</p>
							<p className="text-2xl font-semibold text-teal-600 mb-4">
								90 SQL Practice Questions
							</p>
							<p className="text-gray-600">
								on{" "}
								<span className="font-semibold">SQL90.com</span>
							</p>
						</div>

						{/* Footer Information */}
						<div className="flex flex-col items-center">
							<div className="w-[70%] border-t border-gray-200 mb-6"></div>
							<div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-sm text-gray-600">
								<div className="flex items-center gap-2">
									<span className="font-medium text-gray-700">
										Earned on:
									</span>
									<span>{earnedOn}</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="font-medium text-gray-700">
										Certification ID:
									</span>
									<span className="font-mono text-xs">
										{certId}
									</span>
								</div>
							</div>
							<div className="w-[70%] border-t border-gray-200 mt-6"></div>
						</div>

						{/* Verification Link */}
						<div className="mt-6">
							<p className="text-xs text-gray-500">
								Verify at:{" "}
								<span className="font-mono">
									sql90.com/verify/{certId}
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Edit Name Section */}
			<div className="flex justify-center mb-4">
				<div className="flex items-center justify-center gap-2 w-full max-w-5xl">
					<label className="text-sm font-medium text-gray-700">
						Name on Certificate:
					</label>
					{isEditing ? (
						<div className="flex items-center gap-2">
							<input
								type="text"
								value={editValue}
								onChange={(e) => setEditValue(e.target.value)}
								className="px-3 py-1 border-2 border-teal-600 rounded-md focus:outline-none text-sm font-medium"
								autoFocus
							/>
							<button
								onClick={handleSaveName}
								className="p-1 text-teal-600 hover:text-teal-700 transition-colors"
							>
								<CheckIcon size={16} />
							</button>
							<button
								onClick={handleCancelEdit}
								className="p-1 text-red-500 hover:text-red-700 transition-colors"
							>
								<XIcon size={16} />
							</button>
						</div>
					) : (
						<div className="flex items-center gap-2">
							<span className="text-sm text-gray-900 font-medium">
								{name}
							</span>
							<button
								onClick={() => setIsEditing(true)}
								className="p-1 text-teal-600 hover:text-teal-700 transition-colors"
								title="Edit name"
							>
								<PencilIcon size={16} />
							</button>
						</div>
					)}
				</div>
			</div>

			{/* Action Buttons */}
			<div className="flex justify-center">
				<div className="flex flex-col sm:flex-row gap-3 w-full max-w-5xl">
					<button
						onClick={handleDownload}
						disabled={isDownloading}
						className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors font-medium disabled:opacity-70"
					>
						<DownloadIcon size={18} />
						{isDownloading
							? "Generating Image..."
							: "Download Certificate"}
					</button>
					<button
						onClick={() => {
							const url = `${window.location.origin}/certificate/${certId}`;
							navigator.clipboard.writeText(url);
							toast.success(
								"Certificate link copied to clipboard",
							);
						}}
						className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white text-teal-600 border-2 border-teal-600 rounded-md hover:bg-teal-50 transition-colors font-medium"
					>
						<Share2Icon size={18} />
						Share Certificate
					</button>
				</div>
			</div>
		</div>
	);
}
