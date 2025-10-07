import { Logo } from "@/components/common/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	ArrowRight,
	CheckCircle,
	Code,
	Database,
	Trophy,
	Users,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

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

const signUpSchema = z
	.object({
		username: z.string().min(3, {
			message: "Username must be at least 3 characters",
		}),
		email: z
			.string({
				message: "Email is required",
			})
			.email({
				message: "Email must be a valid email address",
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
		confirmPassword: z
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
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords must match",
		path: ["confirmPassword"],
	});

type LoginFormData = z.infer<typeof signInSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;

declare global {
	interface Window {
		google: any; // For GIS types
	}
}

export default function Auth() {
	const navigate = useNavigate();
	const location = useLocation();
	const { isAuthenticated, login, register, error, loading, socialSignup } =
		useAuth();

	const queryParams = new URLSearchParams(location.search);
	const ref = queryParams.get("ref");

	const {
		register: registerLogin,
		handleSubmit: handleSubmitLogin,
		formState: { errors: loginErrors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			username: "",
			password: "",
			isRemember: false,
		},
	});

	const {
		register: registerSignUp,
		handleSubmit: handleSubmitSignUp,
		formState: { errors: signUpErrors },
	} = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const googleSignupRef = useRef<HTMLDivElement>(null);
	const googleSigninRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Initialize Google Identity Services if script is loaded
		if (window.google?.accounts?.id) {
			const CLIENT_ID =
				"600710270979-asfe1sq12p2l30m09vmfv0ov6hqhqavk.apps.googleusercontent.com"; // Replace with your Google Client ID

			window.google.accounts.id.initialize({
				client_id: CLIENT_ID,
				callback: socialSignup,
				ux_mode: "popup",
			});

			// Render signup button
			if (googleSignupRef.current) {
				window.google.accounts.id.renderButton(
					googleSignupRef.current,
					{
						type: "standard",
						theme: "outline",
						size: "large",
						text: "signup_with",
						shape: "rectangular",
						logo_alignment: "left",
					}
				);
			}

			// Render signin button
			if (googleSigninRef.current) {
				window.google.accounts.id.renderButton(
					googleSigninRef.current,
					{
						type: "standard",
						theme: "outline",
						size: "large",
						text: "signin_with",
						shape: "rectangular",
						logo_alignment: "left",
					}
				);
			}
		}
	}, []);

	const onLoginFormSubmit = async (data: LoginFormData) => {
		const success = await login(
			data.username,
			data.password,
			data.isRemember ?? false
		);
		if (success) {
			toast.success("Login successful");
			navigate("/");
		} else {
			toast.error(error || "Login failed. Please try again.");
		}
	};

	const onSignUpFormSubmit = async (data: SignUpFormData) => {
		const success = await register(
			data.username,
			data.email,
			data.password,
			data.confirmPassword
		);
		if (success) {
			toast.success(
				"An email has been sent to you with a link to confirm your account."
			);
		} else {
			toast.error(error || "Login failed. Please try again.");
		}
	};

	if (isAuthenticated) return <Navigate to="/" replace />;

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
								<Tabs
									defaultValue={
										ref === "signup" ? "signup" : "signin"
									}
									className="w-full"
								>
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
											onSubmit={handleSubmitSignUp(
												onSignUpFormSubmit
											)}
											className="space-y-4"
										>
											<div className="space-y-2">
												<Label htmlFor="username">
													Username
												</Label>
												<Input
													id="username"
													placeholder="johndoe"
													{...registerSignUp(
														"username"
													)}
													className={cn(
														signUpErrors.username &&
															"ring-1 ring-warning"
													)}
												/>

												{signUpErrors.username && (
													<p className="text-warning text-left text-sm w-full">
														{
															signUpErrors
																.username
																.message
														}
													</p>
												)}
											</div>
											<div className="space-y-2">
												<Label htmlFor="email">
													Email
												</Label>
												<Input
													id="email"
													type="email"
													placeholder="john@example.com"
													{...registerSignUp("email")}
													className={cn(
														signUpErrors.email &&
															"ring-1 ring-warning"
													)}
												/>
												{signUpErrors.email && (
													<p className="text-warning text-left text-sm w-full">
														{
															signUpErrors.email
																.message
														}
													</p>
												)}
											</div>
											<div className="space-y-2">
												<Label htmlFor="password">
													Password
												</Label>
												<Input
													id="password"
													type="password"
													placeholder="••••••••"
													{...registerSignUp(
														"password"
													)}
													className={cn(
														signUpErrors.password &&
															"ring-1 ring-warning"
													)}
												/>
												{signUpErrors.password && (
													<p className="text-warning text-left text-sm w-full">
														{
															signUpErrors
																.password
																.message
														}
													</p>
												)}
											</div>
											<div className="space-y-2">
												<Label htmlFor="confirmPassword">
													Confirm Password
												</Label>
												<Input
													id="confirmPassword"
													type="password"
													placeholder="••••••••"
													{...registerSignUp(
														"confirmPassword"
													)}
													className={cn(
														signUpErrors.confirmPassword &&
															"ring-1 ring-warning"
													)}
												/>
												{signUpErrors.confirmPassword && (
													<p className="text-warning text-left text-sm w-full">
														{
															signUpErrors
																.confirmPassword
																.message
														}
													</p>
												)}
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
											<div
												ref={googleSignupRef}
												className="w-full"
											/>
										</form>
									</TabsContent>

									<TabsContent
										value="signin"
										className="space-y-4"
									>
										<form
											onSubmit={handleSubmitLogin(
												onLoginFormSubmit
											)}
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
													{...registerLogin(
														"username"
													)}
													className={cn(
														loginErrors.username &&
															"ring-1 ring-warning"
													)}
												/>
												{loginErrors.username && (
													<p className="text-warning text-left text-sm w-full">
														{
															loginErrors.username
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
													{...registerLogin(
														"password"
													)}
													className={cn(
														loginErrors.password &&
															"ring-1 ring-warning"
													)}
												/>
												{loginErrors.password && (
													<p className="text-warning text-left text-sm w-full">
														{
															loginErrors.password
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
														{...registerLogin(
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
											<div
												ref={googleSigninRef}
												className="w-full"
											/>
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
