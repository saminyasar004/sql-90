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
				"relative bg-white rounded-lg border-2 border-slate-200 shadow-sm w-full max-w-5xl overflow-hidden flex flex-col justify-center items-center aspect-[1.58/1]",
				className,
			)}
		>
			{/* Background Watermarks */}
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div className="flex items-center opacity-[0.03] select-none">
					<span className="text-[15vw] sm:text-[10rem] font-bold text-teal-600">
						SQL
					</span>
					<span className="text-[15vw] sm:text-[10rem] font-bold text-green-500">
						90
					</span>
				</div>
			</div>

			{/* Database Icons in Corners */}
			<div className="absolute top-2 left-2 sm:top-12 sm:left-12 opacity-[0.04] pointer-events-none">
				<Database className="w-4 h-4 sm:w-10 sm:h-10 text-teal-600" />
			</div>
			<div className="absolute top-2 right-2 sm:top-12 sm:right-12 opacity-[0.04] pointer-events-none">
				<Database className="w-4 h-4 sm:w-10 sm:h-10 text-teal-600" />
			</div>
			<div className="absolute bottom-2 left-2 sm:bottom-12 sm:left-12 opacity-[0.04] pointer-events-none">
				<Database className="w-4 h-4 sm:w-10 sm:h-10 text-teal-600" />
			</div>
			<div className="absolute bottom-2 right-2 sm:bottom-12 sm:right-12 opacity-[0.04] pointer-events-none">
				<Database className="w-4 h-4 sm:w-10 sm:h-10 text-teal-600" />
			</div>

			{/* SQL Query Watermarks */}
			<div className="absolute top-1/4 left-4 sm:left-8 opacity-[0.025] pointer-events-none select-none font-mono text-[8px] sm:text-xs text-teal-800 -rotate-12">
				SELECT * FROM achievements
			</div>
			<div className="absolute bottom-1/4 right-4 sm:right-8 opacity-[0.025] pointer-events-none select-none font-mono text-[8px] sm:text-xs text-teal-800 rotate-12">
				JOIN skills ON mastery = 100
			</div>

			{/* Decorative Corners */}
			{/* Top Left */}
			<div className="absolute top-0 left-0 pointer-events-none">
				<div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-8 sm:w-24 h-0.5 sm:h-1 bg-teal-600 rounded-full"></div>
				<div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-0.5 sm:w-1 h-8 sm:h-24 bg-teal-600 rounded-full"></div>
			</div>
			{/* Top Right */}
			<div className="absolute top-0 right-0 pointer-events-none">
				<div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 sm:w-24 h-0.5 sm:h-1 bg-teal-600 rounded-full"></div>
				<div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-0.5 sm:w-1 h-8 sm:h-24 bg-teal-600 rounded-full"></div>
			</div>
			{/* Bottom Left */}
			<div className="absolute bottom-0 left-0 pointer-events-none">
				<div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-8 sm:w-24 h-0.5 sm:h-1 bg-teal-600 rounded-full"></div>
				<div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-0.5 sm:w-1 h-8 sm:h-24 bg-teal-600 rounded-full"></div>
			</div>
			{/* Bottom Right */}
			<div className="absolute bottom-0 right-0 pointer-events-none">
				<div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-8 sm:w-24 h-0.5 sm:h-1 bg-teal-600 rounded-full"></div>
				<div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-0.5 sm:w-1 h-8 sm:h-24 bg-teal-600 rounded-full"></div>
			</div>

			{/* Certificate Body */}
			<div className="text-center relative z-10 w-full px-4 sm:px-10">
				<div className="mb-2 sm:mb-6">
					<div className="inline-flex items-center justify-center mb-1 sm:mb-4 scale-90 sm:scale-100">
						<span className="text-xl sm:text-4xl font-bold text-teal-600">
							SQL
						</span>
						<span className="text-xl sm:text-4xl font-bold text-green-500">
							90
						</span>
					</div>
					<h3 className="text-sm sm:text-3xl font-bold text-slate-800 mb-1 sm:mb-2 whitespace-nowrap">
						Certificate of Completion
					</h3>
					<div className="w-10 sm:w-24 h-0.5 sm:h-1 bg-teal-500 mx-auto rounded-full"></div>
				</div>

				<div className="mb-2 sm:mb-8">
					<p className="text-[10px] sm:text-base text-slate-600 mb-1 sm:mb-4">
						This certifies that
					</p>
					<p className="text-base sm:text-4xl font-bold text-slate-900 mb-1 sm:mb-4 px-2 sm:px-4 break-words leading-tight">
						{name}
					</p>
					<p className="text-[10px] sm:text-base text-slate-600 mb-0.5 sm:mb-2">
						has successfully completed all
					</p>
					<p className="text-xs sm:text-2xl font-semibold text-teal-600 mb-1 sm:mb-4 whitespace-nowrap">
						90 SQL Practice Questions
					</p>
					<p className="text-[10px] sm:text-base text-slate-600">
						on <span className="font-semibold">SQL90.com</span>
					</p>
				</div>

				{/* Footer Information */}
				<div className="flex flex-col items-center w-full">
					<div className="w-[85%] sm:w-[70%] border-t border-slate-100 mb-1 sm:mb-6"></div>
					<div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 sm:gap-x-8 sm:gap-y-2 text-[8px] sm:text-sm text-slate-500 w-full px-2">
						<div className="flex items-center gap-1 sm:gap-2">
							<span className="font-medium text-slate-700">
								Earned on:
							</span>
							<span className="whitespace-nowrap">
								{earnedOn}
							</span>
						</div>
						<div className="flex items-center gap-1 sm:gap-2">
							<span className="font-medium text-slate-700">
								Certification ID:
							</span>
							<span className="font-mono text-[7px] sm:text-xs break-all">
								{certId}
							</span>
						</div>
					</div>
					<div className="w-[85%] sm:w-[70%] border-t border-slate-100 mt-1 sm:mt-6"></div>
				</div>

				{/* Verification Link */}
				<div className="mt-1 sm:mt-6">
					<p className="text-[7px] sm:text-xs text-slate-400">
						Verify at:{" "}
						<span className="font-mono text-[7px] sm:text-xs text-slate-500">
							sql90.com/verify/{certId}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
});

CertificateTemplate.displayName = "CertificateTemplate";
