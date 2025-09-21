import type React from "react";

import { useState } from "react";
import {
	Database,
	Code,
	Trophy,
	Users,
	ArrowRight,
	CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/logo";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const signInSchema = z.object({
	username: z.string().min(3, {
		message: "Username must be at least 3 characters",
	}),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" })
		.max(20, { message: "Password must be at most 20 characters" })
		.regex(/[!@#$%^&*(),.?":{}|<>]/, {
			message: "Password must contain at least one special character",
		})
		.regex(/[0-9]/, {
			message: "Password must contain at least one number",
		})
		.regex(/[A-Z]/, {
			message: "Password must contain at least one uppercase letter",
		}),
	isRemember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof signInSchema>;

export default function Auth() {
	const navigate = useNavigate();
	const { login, error, loading } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			username: "",
			password: "",
			isRemember: false,
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		const success = await login(
			data.username,
			data.password,
			data.isRemember ?? false
		);
		console.log("Login Response: ", success);
		if (success) {
			toast.success("Login successful");
			navigate("/dashboard"); // Redirect to dashboard or protected route
		} else {
			toast.error(error || "Login failed. Please try again.");
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
			{/* Header */}
			<header className="border-b bg-primary text-primary-foreground backdrop-blur-sm">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="flex items-center justify-center w-8 h-8 bg-primary-foreground rounded-lg">
								<Database className="w-5 h-5 text-primary" />
							</div>
							<div>
								<h1 className="text-xl font-bold text-primary-foreground">
									<Logo />
								</h1>
							</div>
						</div>
						<Badge
							variant="secondary"
							className="hidden sm:flex text-primary"
						>
							Join 50,000+ developers
						</Badge>
					</div>
				</div>
			</header>

			<div className="container mx-auto px-4 py-8">
				<div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
					{/* Left side - Features */}
					<div className="space-y-8">
						<div className="space-y-4">
							<h2 className="text-4xl font-bold text-balance">
								Master SQL with interactive challenges
							</h2>
							<p className="text-lg text-muted-foreground text-pretty">
								Join thousands of developers improving their SQL
								skills through hands-on practice, real-world
								scenarios, and instant feedback.
							</p>
						</div>

						<div className="grid gap-4">
							<div className="flex items-start gap-3">
								<div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
									<Code className="w-5 h-5 text-primary" />
								</div>
								<div>
									<h3 className="font-semibold">
										Interactive SQL Editor
									</h3>
									<p className="text-sm text-muted-foreground">
										Practice with a real SQL environment and
										get instant feedback
									</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
									<Trophy className="w-5 h-5 text-primary" />
								</div>
								<div>
									<h3 className="font-semibold">
										Progress Tracking
									</h3>
									<p className="text-sm text-muted-foreground">
										Track your learning journey with
										detailed progress analytics
									</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
									<Users className="w-5 h-5 text-primary" />
								</div>
								<div>
									<h3 className="font-semibold">
										Community Leaderboard
									</h3>
									<p className="text-sm text-muted-foreground">
										Compete with developers worldwide and
										climb the rankings
									</p>
								</div>
							</div>
						</div>

						<div className="flex items-center gap-4 pt-4">
							<div className="flex items-center gap-2">
								<CheckCircle className="w-5 h-5 text-primary" />
								<span className="text-sm font-medium">
									90 Challenges
								</span>
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle className="w-5 h-5 text-primary" />
								<span className="text-sm font-medium">
									Real Databases
								</span>
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle className="w-5 h-5 text-primary" />
								<span className="text-sm font-medium">
									Instant Feedback
								</span>
							</div>
						</div>
					</div>

					{/* Right side - Auth Form */}
					<div className="w-full max-w-md mx-auto">
						<Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
							<CardHeader className="text-center pb-4">
								<CardTitle className="text-2xl">
									Get Started
								</CardTitle>
								<CardDescription>
									Create your account or sign in to continue
									your SQL journey
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Tabs defaultValue="signin" className="w-full">
									<TabsList className="grid w-full grid-cols-2 mb-6">
										<TabsTrigger value="signin">
											Sign In
										</TabsTrigger>
										<TabsTrigger value="signup">
											Sign Up
										</TabsTrigger>
									</TabsList>

									<TabsContent
										value="signup"
										className="space-y-4"
									>
										<form
											// onSubmit={handleSubmit}
											className="space-y-4"
										>
											<div className="grid grid-cols-2 gap-4">
												<div className="space-y-2">
													<Label htmlFor="firstName">
														First name
													</Label>
													<Input
														id="firstName"
														placeholder="John"
														required
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="lastName">
														Last name
													</Label>
													<Input
														id="lastName"
														placeholder="Doe"
														required
													/>
												</div>
											</div>
											<div className="space-y-2">
												<Label htmlFor="email">
													Email
												</Label>
												<Input
													id="email"
													type="email"
													placeholder="john@example.com"
													required
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="password">
													Password
												</Label>
												<Input
													id="password"
													type="password"
													placeholder="••••••••"
													required
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="confirmPassword">
													Confirm Password
												</Label>
												<Input
													id="confirmPassword"
													type="password"
													placeholder="••••••••"
													required
												/>
											</div>
											<Button
												type="submit"
												className="w-full"
												disabled={loading}
											>
												{loading ? (
													<div className="flex items-center gap-2">
														<div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
														Creating account...
													</div>
												) : (
													<div className="flex items-center gap-2">
														Create Account
														<ArrowRight className="w-4 h-4" />
													</div>
												)}
											</Button>
										</form>
									</TabsContent>

									<TabsContent
										value="signin"
										className="space-y-4"
									>
										<form
											onSubmit={handleSubmit(onSubmit)}
											className="space-y-4"
										>
											<div className="space-y-2">
												<Label htmlFor="signinUsername">
													Username
												</Label>
												<Input
													id="signinUsername"
													type="text"
													placeholder="johndoe"
													{...register("username")}
													className={cn(
														errors.username &&
															"ring-1 ring-warning"
													)}
												/>
												{errors.username && (
													<p className="text-warning text-left text-sm w-full">
														{
															errors.username
																.message
														}
													</p>
												)}
											</div>
											<div className="space-y-2">
												<Label htmlFor="signinPassword">
													Password
												</Label>
												<Input
													id="signinPassword"
													type="password"
													placeholder="••••••••"
													{...register("password")}
													className={cn(
														errors.password &&
															"ring-1 ring-warning"
													)}
												/>
												{errors.password && (
													<p className="text-warning text-left text-sm w-full">
														{
															errors.password
																.message
														}
													</p>
												)}
											</div>
											<div className="flex items-center justify-between text-sm">
												<label className="flex items-center gap-2 cursor-pointer">
													<input
														type="checkbox"
														className="rounded border-border"
														{...register(
															"isRemember"
														)}
													/>
													Remember me
												</label>
												<Button
													variant="link"
													className="p-0 h-auto text-primary"
												>
													Forgot password?
												</Button>
											</div>
											<Button
												type="submit"
												className="w-full"
												disabled={loading}
											>
												{loading ? (
													<div className="flex items-center gap-2">
														<div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
														Signing in...
													</div>
												) : (
													<div className="flex items-center gap-2">
														Sign In
														<ArrowRight className="w-4 h-4" />
													</div>
												)}
											</Button>
										</form>
									</TabsContent>
								</Tabs>

								<div className="mt-6 text-center">
									<p className="text-xs text-muted-foreground">
										By continuing, you agree to our{" "}
										<Button
											variant="link"
											className="p-0 h-auto text-xs text-primary"
										>
											Terms of Service
										</Button>{" "}
										and{" "}
										<Button
											variant="link"
											className="p-0 h-auto text-xs text-primary"
										>
											Privacy Policy
										</Button>
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className="border-t bg-muted/30 mt-16">
				<div className="container mx-auto px-4 py-8">
					<div className="text-center text-sm text-muted-foreground">
						<p>
							© 2024 SQL90. All rights reserved. Built for
							developers who love SQL.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
