import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { baseURL } from "@/config/dotenv";
import {
	CheckCircle2,
	AlertCircle,
	ShieldCheck,
	Database,
	ArrowLeft,
} from "lucide-react";
import { Logo } from "@/components/common/logo";

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
			<header className="bg-[#007C7C] text-white py-3 shadow-sm mb-12">
				<div className="container mx-auto flex items-center justify-between">
					<Logo />

					<div className="flex items-center space-x-4">
						<Link
							to="/"
							className="px-4 py-2 text-white rounded-md font-medium hover:bg-[#006666] transition-colors flex items-center gap-2"
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

			<div className="flex-1 container mx-auto max-w-2xl px-4 pb-12">
				<div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
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
					<div className="p-8 sm:p-10">
						{isValid ? (
							<div className="space-y-8">
								<div className="flex flex-col gap-1 border-b border-slate-50 pb-6">
									<span className="text-xs uppercase tracking-widest font-bold text-slate-400">
										Recipient Name
									</span>
									<span className="text-2xl font-bold text-slate-800">
										{displayName}
									</span>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<div className="flex flex-col gap-1">
										<span className="text-xs uppercase tracking-widest font-bold text-slate-400">
											Achievement
										</span>
										<span className="text-lg font-bold text-slate-700">
											90 SQL Questions Mastered
										</span>
									</div>
									<div className="flex flex-col gap-1">
										<span className="text-xs uppercase tracking-widest font-bold text-slate-400">
											Issuance Date
										</span>
										<span className="text-lg font-bold text-slate-700">
											{earnedOn}
										</span>
									</div>
								</div>

								<div className="flex flex-col gap-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
									<span className="text-xs uppercase tracking-widest font-bold text-slate-400">
										Security Identification
									</span>
									<span className="font-mono text-sm font-bold text-slate-600 truncate">
										{certId}
									</span>
								</div>

								<div className="flex items-start gap-4 p-4 bg-teal-50 rounded-2xl border border-teal-100">
									<CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
									<div>
										<h4 className="font-extrabold text-teal-900 text-sm">
											Verified Record
										</h4>
										<p className="text-xs text-teal-700/80 font-medium leading-relaxed">
											This certificate is a valid
											credential issued by SQL90 upon the
											recipient's successful completion of
											the full practice curriculum.
										</p>
									</div>
								</div>
							</div>
						) : (
							<div className="text-center space-y-6 py-4">
								<p className="text-slate-500 font-medium">
									We could not find a verified certificate
									associated with the identification: <br />
									<span className="font-mono text-slate-800 font-bold break-all">
										{certId}
									</span>
								</p>
								<div className="pt-4">
									<Link
										to="/"
										className="inline-block px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:scale-[1.02]"
									>
										Start Practicing
									</Link>
								</div>
							</div>
						)}
					</div>

					{/* Internal Status Footer */}
					<div className="bg-slate-50 px-8 py-5 flex items-center justify-between border-t border-slate-100">
						<div className="flex items-center gap-2 opacity-30 select-none">
							<Database size={16} className="text-slate-900" />
							<span className="text-xs font-bold text-slate-900 tracking-tighter uppercase">
								SQL90 Authority
							</span>
						</div>
						<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
							Digital Credential
						</span>
					</div>
				</div>

				<div className="mt-8 text-center">
					<p className="text-slate-400 text-xs font-medium">
						Learn more about our certification standards at{" "}
						<a href="/" className="text-teal-600 hover:underline">
							sql90.com
						</a>
					</p>
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
