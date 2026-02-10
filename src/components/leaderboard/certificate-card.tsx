import React, { useState, useRef, useEffect } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import {
	DownloadIcon,
	Share2Icon,
	PencilIcon,
	CheckIcon,
	XIcon,
	TrophyIcon,
} from "lucide-react";
import { useGame } from "@/hooks/use-game";
import { toast } from "sonner";
import { CertificateTemplate } from "./CertificateTemplate";

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
		if (certificateData) {
			setEditValue(
				certificateData.name_on_certificate ||
					certificateData.full_name ||
					certificateData.username ||
					"",
			);
		}
	}, [certificateData]);

	const name =
		certificateData?.name_on_certificate ||
		certificateData?.full_name ||
		certificateData?.username ||
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

	// Hide the entire certificate section if it hasn't been earned yet
	if (!certificateData?.certificate_earned_on) {
		return (
			<div className="mb-8 font-sans">
				<h2 className="text-xl font-bold text-[#1E293B] mb-4">
					Your Certificate
				</h2>
				<div className="bg-slate-50 rounded-lg border-2 border-slate-100 p-8 text-center">
					<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
						<TrophyIcon size={32} className="text-slate-400" />
					</div>
					<h3 className="text-lg font-semibold text-slate-700 mb-2">
						Certificate Locked
					</h3>
					<p className="text-slate-500 max-w-md mx-auto">
						Complete all the 90 questions to earn your certificate.
					</p>
				</div>
			</div>
		);
	}

	const handleDownload = async () => {
		if (!certificateRef.current) return;

		let toastId: string | number | undefined;

		try {
			setIsDownloading(true);
			toastId = toast.loading("Preparing your certificate...");

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

			// Init jsPDF with orientation landscape, units px, and format matching the image dimensions
			// We'll calculate dimensions after loading the image to be precise, or just use the element's scrollWidth/Height
			// But since we have dataUrl, we can load it into an Image object to get natural dims,
			// OR just use the ref's dimensions.
			// Better: Create PDF with dimensions of the captured element to maintain 1:1 scale
			const imgWidth = certificateRef.current.scrollWidth;
			const imgHeight = certificateRef.current.scrollHeight;

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

					const imgWidth = certificateRef.current!.scrollWidth;
					const imgHeight = certificateRef.current!.scrollHeight;

					const pdf = new jsPDF({
						orientation: "landscape",
						unit: "px",
						format: [imgWidth, imgHeight],
					});

					pdf.addImage(dataUrl, "PNG", 0, 0, imgWidth, imgHeight);
					pdf.save(
						`SQL90-Certificate-${name.replace(/\s+/g, "-")}.pdf`,
					);

					toast.success(
						"Certificate downloaded (compatibility mode)!",
						{
							id: toastId,
						},
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
		<div className="mb-8 font-sans">
			<h2 className="text-xl font-bold text-[#1E293B] mb-4">
				Your Certificate
			</h2>
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
					<CertificateTemplate
						ref={certificateRef}
						name={name}
						earnedOn={earnedOn}
						certId={certId}
					/>
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
									onChange={(e) =>
										setEditValue(e.target.value)
									}
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
								const url = `${window.location.origin}/verify/${certId}`;
								navigator.clipboard.writeText(url);
								window.open(url, "_blank");
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
		</div>
	);
}
