import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { baseURL } from "@/config/dotenv";
import {
	CheckCircle2,
	AlertCircle,
	ShieldCheck,
	ArrowLeft,
} from "lucide-react";
import { Logo } from "@/components/common/logo";
import { CertificateTemplate } from "@/components/leaderboard/CertificateTemplate";

export default function CertificateVerificationView() {
	const { certId } = useParams<{ certId: string }>();
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const verifyCertificate = async () => {
			try {
				const response = await fetch(
					`${baseURL}/api/verify/${certId}/`,
				);
				if (!response.ok) {
					throw new Error("Verification service unavailable");
				}
				const result = await response.json();
				setData(result);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		if (certId) {
			verifyCertificate();
		}
	}, [certId]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
				<div className="flex flex-col items-center gap-4">
					<div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
					<p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
						Authenticating...
					</p>
				</div>
			</div>
		);
	}

	const isValid = data?.is_valid;
	const displayName = data?.name_on_certificate || data?.full_name || "N/A";
	const earnedOn = data?.earned_on
		? new Date(data.earned_on).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			})
		: "N/A";

	return (
		<div className="min-h-screen bg-slate-50 font-sans flex flex-col">
			<header className="bg-[#007C7C] text-white py-5 sm:py-3 shadow-sm mb-8 sm:mb-12 transition-all">
				<div className="container mx-auto px-4 flex items-center justify-between">
					<Logo />

					<div className="flex items-center space-x-2 sm:space-x-4">
						<Link
							to="/"
							className="px-3 sm:px-4 py-2 text-white rounded-md font-medium hover:bg-[#006666] transition-colors flex items-center gap-2 text-sm sm:text-base"
						>
							<ArrowLeft size={16} />
							<span className="hidden sm:inline">
								Back to Home
							</span>
						</Link>
						<a
							target="_blank"
							href="https://www.amazon.com/dp/B0FBM6WGZX/"
							className="hidden md:block"
						>
							<button className="px-4 py-2 text-white rounded-md font-medium hover:bg-[#006666] transition-colors">
								Get the Book
							</button>
						</a>
					</div>
				</div>
			</header>

			<div className="flex-1 container mx-auto px-4 pb-12">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
					{/* Left Column: Certificate Display */}
					<div className="lg:col-span-2 flex flex-col">
						{isValid ? (
							<div className="w-full max-w-4xl mx-auto lg:mx-0">
								<CertificateTemplate
									name={displayName}
									earnedOn={earnedOn}
									certId={certId}
									className="w-full shadow-2xl"
								/>
							</div>
						) : (
							<div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-12 text-center w-full max-w-4xl mx-auto lg:mx-0 flex flex-col items-center justify-center aspect-[1.58/1]">
								<div className="bg-slate-50 p-4 sm:p-6 rounded-full mb-4 sm:mb-6">
									<AlertCircle className="w-8 h-8 sm:w-16 sm:h-16 text-slate-300" />
								</div>
								<h2 className="text-xl sm:text-2xl font-bold text-slate-700 mb-1 sm:mb-2 text-balance leading-tight">
									Certificate Not Found
								</h2>
								<div className="text-slate-500 max-w-md mx-auto mb-4 sm:mb-8 text-xs sm:text-base px-2">
									We could not find a verified certificate
									associated with ID:{" "}
									<span className="font-mono font-bold text-slate-700 break-all">
										{certId}
									</span>
								</div>
								<Link
									to="/"
									className="px-6 py-2 sm:px-8 sm:py-3 bg-[#007C7C] text-white rounded-lg font-bold hover:bg-[#006666] transition-colors text-sm sm:text-base"
								>
									Go to Home
								</Link>
							</div>
						)}
					</div>

					{/* Right Column: Verification Status */}
					<div className="lg:col-span-1 h-full">
						<div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden sticky top-8">
							{/* Status Banner */}
							<div
								className={`py-8 px-6 text-center ${isValid ? "bg-teal-500" : "bg-red-500"}`}
							>
								<div className="flex justify-center mb-4">
									{isValid ? (
										<div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
											<ShieldCheck className="w-12 h-12 text-white" />
										</div>
									) : (
										<div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
											<AlertCircle className="w-12 h-12 text-white" />
										</div>
									)}
								</div>
								<h1 className="text-2xl font-extrabold text-white tracking-tight">
									{isValid
										? "Authentic Certificate"
										: "Invalid Certificate"}
								</h1>
								<p className="text-white/80 font-medium mt-1">
									{isValid
										? "Official SQL90 Certification"
										: "No record found for this ID"}
								</p>
							</div>

							{/* Verification Content */}
							{isValid && (
								<div className="p-8">
									<div className="space-y-6">
										<div className="flex flex-col gap-1 border-b border-slate-50 pb-4">
											<span className="text-xs uppercase tracking-widest font-bold text-slate-400">
												Recipient Name
											</span>
											<span className="text-xl font-bold text-slate-800 break-words">
												{displayName}
											</span>
										</div>

										<div className="flex flex-col gap-1">
											<span className="text-xs uppercase tracking-widest font-bold text-slate-400">
												Achievement
											</span>
											<span className="text-md font-bold text-slate-700">
												90 SQL Questions Mastered
											</span>
										</div>

										<div className="flex flex-col gap-1">
											<span className="text-xs uppercase tracking-widest font-bold text-slate-400">
												Issuance Date
											</span>
											<span className="text-md font-bold text-slate-700">
												{earnedOn}
											</span>
										</div>

										<div className="flex flex-col gap-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
											<span className="text-xs uppercase tracking-widest font-bold text-slate-400">
												Security Identification
											</span>
											<span className="font-mono text-xs font-bold text-slate-600 break-all">
												{certId}
											</span>
										</div>

										<div className="flex items-start gap-4 p-4 bg-teal-50 rounded-xl border border-teal-100">
											<CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
											<div>
												<h4 className="font-extrabold text-teal-900 text-sm">
													Verified Record
												</h4>
												<p className="text-xs text-teal-700/80 font-medium leading-relaxed mt-1">
													This certificate is a valid
													credential issued by SQL90
													upon successful completion
													of the curriculum.
												</p>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<footer className="bg-[#007C7C] w-full mt-auto">
				<div className="container mx-auto px-4 py-6 text-center text-sm text-white">
					© {new Date().getFullYear()} SQL90. All rights reserved.
					Built for data professionals who love SQL.
				</div>
			</footer>
		</div>
	);
}
