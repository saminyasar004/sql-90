import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { baseURL } from "@/config/dotenv";
import { Database } from "lucide-react";
import { Logo } from "@/components/common/logo";

export default function CertificatePublicView() {
	const { certId } = useParams<{ certId: string }>();
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPublicCertificate = async () => {
			try {
				const response = await fetch(
					`${baseURL}/api/certificate/${certId}/`,
				);
				if (!response.ok) {
					throw new Error("Certificate not found");
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
			fetchPublicCertificate();
		}
	}, [certId]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
				<p className="text-slate-500 font-medium animate-pulse">
					Verifying certificate...
				</p>
			</div>
		);
	}

	if (error || !data) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans p-4">
				<div className="bg-white p-8 rounded-3xl shadow-sm text-center max-w-sm">
					<h1 className="text-2xl font-bold text-slate-800 mb-2">
						Oops!
					</h1>
					<p className="text-slate-500 mb-6">
						{error || "This certificate could not be found."}
					</p>
					<Link
						to="/"
						className="px-6 py-3 bg-[#007C7C] text-white rounded-xl font-bold inline-block"
					>
						Go to SQL90
					</Link>
				</div>
			</div>
		);
	}

	const earnedOn = data.certificate_earned_on
		? new Date(data.certificate_earned_on).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			})
		: "N/A";

	return (
		<div className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
			<div className="container mx-auto max-w-5xl">
				<div className="flex justify-center mb-8">
					<Link to="/">
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100 hover:scale-105 transition-transform">
							<Logo />
						</div>
					</Link>
				</div>

				<div className="relative bg-white rounded-lg border-2 border-slate-200 p-8 sm:p-12 shadow-xl overflow-hidden aspect-[1.414/1]">
					{/* Background Watermarks - Identical to CertificateCard */}
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

					<div className="text-center relative z-10 py-10">
						<div className="mb-10">
							<div className="inline-flex items-center justify-center mb-6">
								<span className="text-5xl font-bold text-teal-600">
									SQL
								</span>
								<span className="text-5xl font-bold text-green-500">
									90
								</span>
							</div>
							<h3 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
								Certificate of Completion
							</h3>
							<div className="w-32 h-1.5 bg-teal-500 mx-auto rounded-full"></div>
						</div>

						<div className="mb-12">
							<p className="text-slate-500 text-lg mb-6">
								This certifies that
							</p>
							<p className="text-4xl sm:text-6xl font-extrabold text-[#1E293B] mb-8">
								{data.name_on_certificate ||
									data.full_name ||
									"Achiever"}
							</p>
							<p className="text-slate-500 text-lg mb-4">
								has successfully completed all
							</p>
							<p className="text-3xl font-bold text-[#0D9488] mb-6">
								90 SQL Practice Questions
							</p>
							<p className="text-slate-500">
								on{" "}
								<span className="font-bold text-slate-800">
									SQL90.com
								</span>
							</p>
						</div>

						{/* Footer Information */}
						<div className="flex flex-col items-center mt-auto">
							<div className="w-[80%] border-t border-slate-100 mb-8"></div>
							<div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-slate-600">
								<div className="flex flex-col items-center gap-1">
									<span className="text-xs uppercase tracking-widest font-bold text-slate-400">
										Earned on
									</span>
									<span className="font-bold text-lg">
										{earnedOn}
									</span>
								</div>
								<div className="flex flex-col items-center gap-1">
									<span className="text-xs uppercase tracking-widest font-bold text-slate-400">
										Certification ID
									</span>
									<span className="font-mono font-bold text-lg tracking-tight">
										{certId}
									</span>
								</div>
							</div>
							<div className="w-[80%] border-t border-slate-100 mt-8 mb-6"></div>
							<p className="text-xs text-slate-400 font-medium">
								Verified by SQL90 Certification Authority
							</p>
						</div>
					</div>
				</div>

				<div className="mt-12 text-center">
					<p className="text-slate-500 mb-4 font-medium">
						This is a verified certificate of completion from SQL90.
					</p>
					<button
						onClick={() => window.print()}
						className="px-8 py-3 bg-white text-slate-700 border-2 border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm"
					>
						Download as PDF
					</button>
				</div>
			</div>
		</div>
	);
}
