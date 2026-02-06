import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { KeyIcon } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

interface ChangePasswordModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function ChangePasswordModal({
	open,
	onOpenChange,
}: ChangePasswordModalProps) {
	const { changePassword, loading } = useAuth();
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!oldPassword || !newPassword || !confirmPassword) {
			toast.error("Please fill in all fields");
			return;
		}

		if (newPassword !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		const success = await changePassword(oldPassword, newPassword);
		if (success) {
			onOpenChange(false);
			setOldPassword("");
			setNewPassword("");
			setConfirmPassword("");
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px] p-8 rounded-2xl">
				<DialogHeader className="flex flex-row items-center gap-4 mb-6">
					<div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center">
						<KeyIcon className="text-teal-600 w-6 h-6" />
					</div>
					<div className="flex flex-col text-left">
						<DialogTitle className="text-2xl font-bold text-gray-900 leading-none mb-2">
							Change Password
						</DialogTitle>
						<DialogDescription className="text-gray-500 text-sm font-medium">
							Enter your current password and choose a new one.
						</DialogDescription>
					</div>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<Label
							htmlFor="current-password"
							className="text-gray-600 font-bold text-sm"
						>
							Current Password
						</Label>
						<PasswordInput
							id="current-password"
							placeholder="Enter current password"
							value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}
							className="rounded-xl border-gray-200 h-12 focus:border-teal-500 transition-colors"
						/>
					</div>

					<div className="space-y-2">
						<Label
							htmlFor="new-password"
							className="text-gray-600 font-bold text-sm"
						>
							New Password
						</Label>
						<PasswordInput
							id="new-password"
							placeholder="Enter new password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className="rounded-xl border-gray-200 h-12 focus:border-teal-500 transition-colors"
						/>
					</div>

					<div className="space-y-2">
						<Label
							htmlFor="confirm-password"
							className="text-gray-600 font-bold text-sm"
						>
							Confirm New Password
						</Label>
						<PasswordInput
							id="confirm-password"
							placeholder="Confirm new password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="rounded-xl border-gray-200 h-12 focus:border-teal-500 transition-colors"
						/>
					</div>

					<div className="flex justify-end gap-3 pt-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
							className="rounded-lg h-12 px-8 border-gray-200 text-gray-600 font-bold hover:bg-gray-50"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={loading}
							className="rounded-lg h-12 px-8 bg-teal-600 hover:bg-teal-700 text-white font-bold transition-all"
						>
							{loading ? "Changing..." : "Change Password"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
