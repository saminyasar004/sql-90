import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { baseURL } from "@/config/dotenv";
import { Logo } from "@/components/common/logo";
import { CertificateTemplate } from "@/components/leaderboard/CertificateTemplate";

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

				<CertificateTemplate
					name={
						data.name_on_certificate || data.full_name || "Achiever"
					}
					earnedOn={earnedOn}
					certId={certId || ""}
					className="w-full h-auto aspect-[1.58/1] shadow-xl"
				/>

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
