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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { googleConsoleClientID } from "@/config/dotenv";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle, Code, Trophy, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signInSchema = z.object({
	username: z.string().min(3, {
		message: "Username must be at least 3 characters",
	}),
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
		google: any;
	}
}

export default function Auth() {
	const navigate = useNavigate();
	const location = useLocation();
	const { isAuthenticated, login, register, error, loading, socialSignup } =
		useAuth();

	const queryParams = new URLSearchParams(location.search);
	const ref = queryParams.get("ref");
	const [activeTab, setActiveTab] = useState(
		ref === "signup" ? "signup" : "signin"
	);

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
		if (!window.google?.accounts?.id) return;

		window.google.accounts.id.initialize({
			client_id: googleConsoleClientID,
			callback: socialSignup,
			ux_mode: "popup",
		});

		const options = {
			type: "standard",
			theme: "outline",
			size: "large",
			shape: "rectangular",
			logo_alignment: "left",
		};

		if (googleSigninRef.current) {
			googleSigninRef.current.innerHTML = "";
			window.google.accounts.id.renderButton(googleSigninRef.current, {
				...options,
				text: "signin_with",
			});
		}

		if (googleSignupRef.current) {
			googleSignupRef.current.innerHTML = "";
			window.google.accounts.id.renderButton(googleSignupRef.current, {
				...options,
				text: "signup_with",
			});
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
			toast.error(error || "Signup failed. Please try again.");
		}
	};

	if (isAuthenticated) return <Navigate to="/" replace />;

	return (
		<div className="min-h-screen bg-white">
			{/* Header */}
			<header className="bg-[#007C7C] text-white py-3 shadow-sm">
				<div className="container mx-auto flex items-center justify-between">
					<Logo />

					<div className="flex flex-row gap-5 items-center">
						<a
							target="_blank"
							href="https://www.amazon.com/dp/B0FBM6WGZX/"
						>
							<button className="px-4 py-2 text-white rounded-md font-medium hover:bg-[#006666] transition-colors">
								Get the Book
							</button>
						</a>

						<Badge className="bg-white text-[#007C7C] hover:border-white hover:text-white font-medium rounded-md">
							Join 10,000+ data professionals
						</Badge>
					</div>
				</div>
			</header>

			<div className="container mx-auto py-10 min-h-[90vh]">
				<div className="grid lg:grid-cols-2 gap-12 items-start pt-10">
					{/* Left Section */}
					<div className="space-y-14">
						<div className="space-y-4">
							<h2 className="text-4xl font-bold text-gray-900 leading-snug">
								Master SQL with interactive challenges
							</h2>
							<p className="text-lg text-gray-600">
								Join thousands of developers improving their SQL
								skills through hands-on practice, real-world
								scenarios, and instant feedback.
							</p>
						</div>

						<div className="space-y-8">
							<div className="flex items-start gap-5">
								<div className="flex items-center justify-center w-14 h-14 bg-[#E6F4F1] rounded-md">
									<Code className="w-8 h-8 text-[#007C7C]" />
								</div>
								<div>
									<h3 className="font-semibold text-gray-800 text-lg">
										Interactive SQL Editor
									</h3>
									<p className="text-gray-600 text-base">
										Practice with a real SQL environment and
										get instant feedback
									</p>
								</div>
							</div>

							<div className="flex items-start gap-5">
								<div className="flex items-center justify-center w-14 h-14 bg-[#E6F4F1] rounded-md">
									<Trophy className="w-8 h-8 text-[#007C7C]" />
								</div>
								<div>
									<h3 className="font-semibold text-gray-800 text-lg">
										Progress Tracking
									</h3>
									<p className="text-gray-600 text-base">
										Track your learning journey with
										detailed progress analytics
									</p>
								</div>
							</div>

							<div className="flex items-start gap-5">
								<div className="flex items-center justify-center w-14 h-14 bg-[#E6F4F1] rounded-md">
									<Users className="w-8 h-8 text-[#007C7C]" />
								</div>
								<div>
									<h3 className="font-semibold text-gray-800 text-lg">
										Community Leaderboard
									</h3>
									<p className="text-gray-600 text-base">
										Compete with developers worldwide and
										climb the rankings
									</p>
								</div>
							</div>
						</div>

						<div className="flex flex-wrap items-center gap-6 pt-8 border-t border-gray-200 mt-8">
							<div className="flex items-center gap-4">
								<CheckCircle className="w-8 h-8 text-[#007C7C]" />
								<span className="text-base font-medium text-gray-700">
									90 Challenges
								</span>
							</div>
							<div className="flex items-center gap-4">
								<CheckCircle className="w-8 h-8 text-[#007C7C]" />
								<span className="text-base font-medium text-gray-700">
									Real Databases
								</span>
							</div>
							<div className="flex items-center gap-4">
								<CheckCircle className="w-8 h-8 text-[#007C7C]" />
								<span className="text-base font-medium text-gray-700">
									Instant Feedback
								</span>
							</div>
						</div>
					</div>

					{/* Right Section */}
					<div className="w-full flex justify-end">
						<Card className="w-full lg:w-[90%] bg-white shadow-md border border-gray-100">
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
									value={activeTab}
									onValueChange={setActiveTab}
									className="w-full"
								>
									<TabsList className="grid w-full grid-cols-2 mb-6 border border-gray-200 rounded-lg overflow-hidden">
										<TabsTrigger
											value="signin"
											className="data-[state=active]:bg-[#007C7C] data-[state=active]:text-white text-gray-700"
										>
											Sign In
										</TabsTrigger>
										<TabsTrigger
											value="signup"
											className="data-[state=active]:bg-[#007C7C] data-[state=active]:text-white text-gray-700"
										>
											Sign Up
										</TabsTrigger>
									</TabsList>

									{/* Sign Up Form */}
									<div
										className={
											activeTab === "signup"
												? "block"
												: "hidden"
										}
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
													<p className="text-warning text-left text-sm">
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
													<p className="text-warning text-left text-sm">
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
													<p className="text-warning text-left text-sm">
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
													<p className="text-warning text-left text-sm">
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
												className="w-full bg-[#0B2239] hover:bg-[#0B2239]/90 text-white"
												disabled={loading}
											>
												{loading ? (
													<div className="flex items-center gap-2">
														<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
														Creating account...
													</div>
												) : (
													<div className="flex items-center gap-2">
														Create Account{" "}
														<ArrowRight className="w-4 h-4" />
													</div>
												)}
											</Button>

											<div
												ref={googleSignupRef}
												className="w-full flex justify-center [&>div]:w-full"
											/>
										</form>
									</div>

									{/* Sign In Form */}
									<div
										className={
											activeTab === "signin"
												? "block"
												: "hidden"
										}
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
													<p className="text-warning text-left text-sm">
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
													<p className="text-warning text-left text-sm">
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
													className="p-0 h-auto text-[#007C7C]"
												>
													Forgot password?
												</Button>
											</div>

											<Button
												type="submit"
												className="w-full h-12 bg-[#0B2239] hover:bg-[#0B2239]/90 text-white"
												disabled={loading}
											>
												{loading ? (
													<div className="flex items-center gap-2">
														<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
														Signing in...
													</div>
												) : (
													<div className="flex items-center gap-2">
														Sign In{" "}
														<ArrowRight className="w-4 h-4" />
													</div>
												)}
											</Button>

											<div
												ref={googleSigninRef}
												className="w-full flex justify-center [&>div]:w-full"
											/>
										</form>
									</div>
								</Tabs>

								<div className="mt-6 text-center">
									<p className="text-xs text-gray-500">
										By continuing, you agree to our{" "}
										<Link to="/terms">
											<Button
												variant="link"
												className="p-0 h-auto text-xs text-[#007C7C]"
											>
												Terms of Service
											</Button>
										</Link>{" "}
										and{" "}
										<Link to="/privacy">
											<Button
												variant="link"
												className="p-0 h-auto text-xs text-[#007C7C]"
											>
												Privacy Policy
											</Button>
										</Link>
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className="bg-[#007C7C] w-full">
				<div className="container mx-auto px-4 py-6 text-center text-sm text-white">
					© {new Date().getFullYear()} SQL90. All rights reserved.
					Built for data professionals who love SQL.
				</div>
			</footer>
		</div>
	);
}
