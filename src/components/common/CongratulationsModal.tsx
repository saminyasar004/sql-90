import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight } from "lucide-react";

interface CongratulationsModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onViewCertificate: () => void;
}

export function CongratulationsModal({
	open,
	onOpenChange,
	onViewCertificate,
}: CongratulationsModalProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md bg-white rounded-3xl p-8 border-none overflow-hidden">
				{/* Celebratory Background Elements */}
				<div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-500"></div>

				<div className="flex flex-col items-center text-center space-y-6 py-4">
					<div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center animate-bounce">
						<Trophy className="w-10 h-10 text-teal-600" />
					</div>

					<DialogHeader className="space-y-2">
						<DialogTitle className="text-3xl font-extrabold text-slate-900 tracking-tight">
							Incredible Achievement!
						</DialogTitle>
						<DialogDescription className="text-slate-500 text-lg font-medium">
							You've done an incredible job completing all 90
							practice questions. Your certificate is ready to
							view and share.
						</DialogDescription>
					</DialogHeader>

					<div className="w-full space-y-3">
						<Button
							onClick={onViewCertificate}
							className="w-full bg-[#007C7C] hover:bg-[#006666] text-white py-6 rounded-xl text-lg font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
						>
							View your certificate
							<ArrowRight className="w-5 h-5" />
						</Button>
						<button
							onClick={() => onOpenChange(false)}
							className="text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors uppercase tracking-wider"
						>
							Close
						</button>
					</div>
				</div>

				{/* Decorative Ornaments */}
				<div className="absolute -bottom-6 -left-6 w-24 h-24 bg-teal-50 rounded-full opacity-50 blur-2xl"></div>
				<div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-50 rounded-full opacity-50 blur-2xl"></div>
			</DialogContent>
		</Dialog>
	);
}
