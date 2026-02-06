import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const resetPasswordSchema = z
	.object({
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" })
			.regex(/[!@#$%^&*(),.?":{}|<>]/, {
				message: "Password must contain at least one special character",
			})
			.regex(/[0-9]/, {
				message: "Password must contain at least one number",
			})
			.regex(/[A-Z]/, {
				message: "Password must contain at least one uppercase letter",
			}),
		confirmPassword: z.string().min(8),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords must match",
		path: ["confirmPassword"],
	});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function PasswordResetConfirm() {
	const { uidb64, token } = useParams<{ uidb64: string; token: string }>();
	const navigate = useNavigate();
	const { confirmPasswordReset, loading } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetPasswordFormData>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: ResetPasswordFormData) => {
		if (!uidb64 || !token) {
			toast.error("Invalid reset link");
			return;
		}

		const success = await confirmPasswordReset(
			uidb64,
			token,
			data.password,
		);
		if (success) {
			navigate("/auth");
		}
	};

	return (
		<div className="min-h-screen bg-white">
			{/* Header */}
			<header className="bg-[#007C7C] text-white py-3 shadow-sm">
				<div className="container mx-auto flex items-center justify-between">
					<Logo />
				</div>
			</header>

			<div className="container mx-auto py-10 lg:py-20 min-h-[80vh] flex items-center justify-center">
				<Card className="w-full max-w-md bg-white shadow-md border border-gray-100">
					<CardHeader className="text-center pb-4">
						<div className="mx-auto w-12 h-12 bg-[#E6F4F1] rounded-full flex items-center justify-center mb-4">
							<Lock className="w-6 h-6 text-[#007C7C]" />
						</div>
						<CardTitle className="text-2xl">
							Set New Password
						</CardTitle>
						<CardDescription>
							Please enter your new password below to reset your
							account access.
						</CardDescription>
					</CardHeader>

					<CardContent>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<div className="space-y-2">
								<Label htmlFor="password">New Password</Label>
								<PasswordInput
									id="password"
									placeholder="••••••••"
									{...register("password")}
									className={cn(
										errors.password &&
											"ring-1 ring-warning",
									)}
								/>
								{errors.password && (
									<p className="text-warning text-left text-sm">
										{errors.password.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="confirmPassword">
									Confirm New Password
								</Label>
								<PasswordInput
									id="confirmPassword"
									placeholder="••••••••"
									{...register("confirmPassword")}
									className={cn(
										errors.confirmPassword &&
											"ring-1 ring-warning",
									)}
								/>
								{errors.confirmPassword && (
									<p className="text-warning text-left text-sm">
										{errors.confirmPassword.message}
									</p>
								)}
							</div>

							<Button
								type="submit"
								className="w-full h-12 bg-[#0B2239] hover:bg-[#0B2239]/90 text-white"
								disabled={loading}
							>
								{loading ? (
									<div className="flex items-center gap-2">
										<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
										Resetting password...
									</div>
								) : (
									<div className="flex items-center gap-2">
										Reset Password{" "}
										<ArrowRight className="w-4 h-4" />
									</div>
								)}
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>

			{/* Footer */}
			<footer className="bg-[#007C7C] w-full fixed bottom-0">
				<div className="container mx-auto px-4 py-6 text-center text-sm text-white">
					© {new Date().getFullYear()} SQL90. All rights reserved.
				</div>
			</footer>
		</div>
	);
}
