import React, { forwardRef } from "react";
import { Database } from "lucide-react";

import { cn } from "@/lib/utils";

interface CertificateTemplateProps {
	name: string;
	earnedOn: string;
	certId: string;
	className?: string;
}

export const CertificateTemplate = forwardRef<
	HTMLDivElement,
	CertificateTemplateProps
>(({ name, earnedOn, certId, className }, ref) => {
	return (
		<div
			ref={ref}
			className={cn(
				"relative bg-white rounded-lg border-2 border-gray-200 p-8 sm:p-10 shadow-sm w-full max-w-5xl overflow-hidden flex flex-col justify-center",
				className,
			)}
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
					<p className="text-gray-600 mb-4">This certifies that</p>
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
						on <span className="font-semibold">SQL90.com</span>
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
							<span className="font-mono text-xs">{certId}</span>
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
	);
});

CertificateTemplate.displayName = "CertificateTemplate";
