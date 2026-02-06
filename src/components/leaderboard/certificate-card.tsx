import React, { useState } from "react";
import {
	DownloadIcon,
	Share2Icon,
	PencilIcon,
	CheckIcon,
	XIcon,
	Database,
} from "lucide-react";

export function CertificateCard() {
	const [name, setName] = useState(() => {
		return (
			localStorage.getItem("certificateName") ||
			localStorage.getItem("username") ||
			"John Doe"
		);
	});
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(name);
	const [certId] = useState(() => {
		const savedId = localStorage.getItem("certificateId");
		if (savedId) return savedId;
		const newId = `SQL90-2025-JD-8F3A9C`;
		localStorage.setItem("certificateId", newId);
		return newId;
	});

	const handleSaveName = () => {
		setName(editValue);
		localStorage.setItem("certificateName", editValue);
		setIsEditing(false);
	};

	const handleCancelEdit = () => {
		setEditValue(name);
		setIsEditing(false);
	};

	const currentDate = "February 5, 2026";

	return (
		<div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-3xl p-6 md:p-8 shadow-sm">
			<div className="flex items-start gap-5 mb-10">
				<div className="bg-[#DCFCE7] p-3 rounded-2xl flex items-center justify-center">
					<span
						className="text-3xl"
						role="img"
						aria-label="party popper"
					>
						🎉
					</span>
				</div>
				<div>
					<h3 className="text-xl font-bold text-[#1E293B] leading-tight mb-1">
						Congratulations! You've completed all 90 questions!
					</h3>
					<p className="text-base text-[#64748B] font-normal opacity-80">
						Download or share your certificate of completion
					</p>
				</div>
			</div>

			{/* Certificate Preview */}
			<div className="bg-white border border-gray-100 rounded-xl p-8 md:p-16 mb-10 relative overflow-hidden shadow-sm flex flex-col items-center">
				{/* Corner accents - Exact Teal/Green proportions */}
				{/* Top Left */}
				<div className="absolute top-10 left-10">
					<div className="border-l-[3.5px] border-t-[3.5px] border-[#008080] w-[70px] h-[70px]"></div>
					<div className="absolute top-1.5 left-1.5 border-l-[3.5px] border-t-[3.5px] border-[#22C55E] w-[50px] h-[50px]"></div>
					<Database
						size={28}
						className="absolute top-3 left-16 text-[#008080] opacity-5 select-none"
					/>
				</div>
				{/* Top Right */}
				<div className="absolute top-10 right-10">
					<div className="border-r-[3.5px] border-t-[3.5px] border-[#008080] w-[70px] h-[70px]"></div>
					<div className="absolute top-1.5 right-1.5 border-r-[3.5px] border-t-[3.5px] border-[#22C55E] w-[50px] h-[50px]"></div>
					<Database
						size={28}
						className="absolute top-3 right-16 text-[#008080] opacity-5 select-none"
					/>
				</div>
				{/* Bottom Left */}
				<div className="absolute bottom-10 left-10">
					<div className="border-l-[3.5px] border-b-[3.5px] border-[#008080] w-[70px] h-[70px]"></div>
					<div className="absolute bottom-1.5 left-1.5 border-l-[3.5px] border-b-[3.5px] border-[#22C55E] w-[50px] h-[50px]"></div>
					<Database
						size={28}
						className="absolute bottom-3 left-16 text-[#008080] opacity-5 select-none"
					/>
				</div>
				{/* Bottom Right */}
				<div className="absolute bottom-10 right-10">
					<div className="border-r-[3.5px] border-b-[3.5px] border-[#008080] w-[70px] h-[70px]"></div>
					<div className="absolute bottom-1.5 right-1.5 border-r-[3.5px] border-b-[3.5px] border-[#22C55E] w-[50px] h-[50px]"></div>
					<Database
						size={28}
						className="absolute bottom-3 right-16 text-[#008080] opacity-5 select-none"
					/>
				</div>

				{/* SQL Query Text Watermarks */}
				<div className="absolute top-[20%] left-[10%] rotate-[-15deg] opacity-[0.03] text-lg font-mono font-bold select-none pointer-events-none">
					SELECT * FROM achievements
				</div>
				<div className="absolute top-[35%] right-[15%] rotate-[10deg] opacity-[0.03] text-lg font-mono font-bold select-none pointer-events-none">
					WHERE completed = true
				</div>
				<div className="absolute bottom-[25%] left-[12%] rotate-[15deg] opacity-[0.03] text-lg font-mono font-bold select-none pointer-events-none">
					ORDER BY excellence DESC
				</div>
				<div className="absolute bottom-[20%] right-[10%] rotate-[-10deg] opacity-[0.03] text-lg font-mono font-bold select-none pointer-events-none">
					JOIN skills ON mastery = 100
				</div>

				{/* Huge background center watermark */}
				<div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
					<span className="text-[18rem] font-medium tracking-tighter text-[#008080]">
						SQL90
					</span>
				</div>

				{/* Content */}
				<div className="relative z-10 text-center flex flex-col items-center w-full max-w-2xl px-4">
					<div className="mb-3 scale-110">
						<span className="text-2xl font-bold tracking-tighter">
							<span className="text-[#008080]">SQL</span>
							<span className="text-[#22C55E]">90</span>
						</span>
					</div>

					<h1 className="text-[1.5rem] md:text-[2rem] font-semibold text-[#1E293B] mb-2 leading-tight tracking-tight">
						Certificate of Completion
					</h1>
					<div className="w-28 h-[4px] bg-[#008080] mb-12 rounded-full overflow-hidden">
						<div className="w-1/2 h-full bg-[#008080] float-right"></div>
					</div>

					<p className="text-[#64748B] text-sm md:text-md font-normal mb-6 opacity-70">
						This certifies that
					</p>

					<h2 className="text-3xl md:text-[2rem] font-semibold text-[#1E293B] mb-10 tracking-tight break-words w-full leading-none">
						{name}
					</h2>

					<p className="text-[#64748B] text-sm md:text-lg font-normal mb-3 opacity-70">
						has successfully completed all
					</p>
					<p className="text-2xl md:text-[2.2rem] font-semibold tracking-tight mb-4 text-[#008080]">
						90{" "}
						<span className="text-[#008080]">
							SQL Practice Questions
						</span>
					</p>
					<p className="text-base text-[#64748B] font-medium mb-20">
						on{" "}
						<span className="text-[#1E293B] font-semibold">
							SQL90.com
						</span>
					</p>

					{/* Custom Footer with Dual Horizontal Lines */}
					<div className="w-full relative flex flex-col items-center">
						<div className="w-full h-[0.5px] bg-gray-100 mb-8"></div>
						<div className="w-full flex flex-col sm:flex-row justify-between text-[12px] md:text-[14px] text-[#94A3B8] font-medium gap-6 px-4 mb-8">
							<div className="flex items-center gap-2">
								<span className="opacity-70">Earned on:</span>
								<span className="text-[#475569] font-semibold">
									{currentDate}
								</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="opacity-70">
									Certification ID:
								</span>
								<span className="text-[#475569] font-semibold">
									{certId}
								</span>
							</div>
						</div>
						<div className="w-full h-[0.5px] bg-gray-100 italic"></div>
					</div>

					<div className="mt-14 text-[11px] text-gray-300 font-medium tracking-widest uppercase">
						Verify at:{" "}
						<span className="opacity-80">
							sql90.com/verify/{certId}
						</span>
					</div>
				</div>
			</div>

			{/* Edit Footer */}
			<div className="flex flex-col items-center gap-8">
				<div className="flex items-center gap-4">
					<span className="text-[#475569] font-medium text-lg border-b border-transparent">
						Name on Certificate:
					</span>
					{isEditing ? (
						<div className="flex items-center gap-2">
							<input
								type="text"
								value={editValue}
								onChange={(e) => setEditValue(e.target.value)}
								className="px-5 py-2 border-2 border-[#008080] rounded-xl focus:outline-none text-[#1E293B] font-bold text-xl shadow-sm"
								autoFocus
							/>
							<button
								onClick={handleSaveName}
								className="p-2 px-3 text-white bg-[#008080] rounded-lg transition-all hover:bg-[#006666] shadow-md"
							>
								<CheckIcon size={22} className="stroke-[3]" />
							</button>
							<button
								onClick={handleCancelEdit}
								className="p-2 px-3 text-white bg-red-400 rounded-lg transition-all hover:bg-red-500 shadow-md"
							>
								<XIcon size={22} className="stroke-[3]" />
							</button>
						</div>
					) : (
						<div
							className="flex items-center gap-3 group cursor-pointer"
							onClick={() => setIsEditing(true)}
						>
							<span className="text-[#1E293B] font-bold text-2xl border-b-[3px] border-transparent transition-colors group-hover:border-[#22C55E] pb-1 leading-none">
								{name}
							</span>
							<div className="bg-[#E6F9F9] p-2 rounded-full transition-all group-hover:scale-110">
								<PencilIcon
									size={20}
									className="text-[#22C55E]"
								/>
							</div>
						</div>
					)}
				</div>

				<div className="flex flex-col sm:flex-row gap-5 w-full">
					<button className="flex-[5.5] bg-[#008080] hover:bg-[#006666] text-white py-4.5 px-10 rounded-xl font-bold text-lg flex items-center justify-center gap-4 transition-all shadow-md active:scale-[0.98] group">
						<DownloadIcon size={24} className="stroke-[3]" />
						Download Certificate
					</button>
					<button className="flex-[4.5] bg-white border-[3px] border-[#008080] text-[#008080] hover:bg-teal-50 py-4.5 px-10 rounded-xl font-bold text-lg flex items-center justify-center gap-4 transition-all shadow-sm active:scale-[0.98]">
						<Share2Icon size={24} className="stroke-[3]" />
						Share Certificate
					</button>
				</div>
			</div>
		</div>
	);
}
