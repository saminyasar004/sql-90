import { baseURL } from "@/config/dotenv";
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type AuthContextType = {
	error: string | null;
	loading: boolean;
	isAuthenticated: boolean;
	accessToken: string;
	hasUnlockedSolutions: boolean;
	login: (
		username: string,
		password: string,
		isRemember: boolean,
	) => Promise<boolean>;
	register: (
		username: string,
		email: string,
		password: string,
		confirmPassword: string,
	) => Promise<any>;
	socialSignup: (response: GoogleCredentialResponse) => Promise<boolean>;
	logout: () => void;
	fetchProfile: (token: string) => Promise<void>;
	refreshUserInfo: () => Promise<void>;
	deleteAccount: () => Promise<boolean>;
	requestPasswordReset: (email: string) => Promise<boolean>;
	confirmPasswordReset: (
		uidb64: string,
		token: string,
		new_password: string,
	) => Promise<boolean>;
	changePassword: (
		old_password: string,
		new_password: string,
	) => Promise<boolean>;
};

export interface GoogleCredentialResponse {
	clientId: string;
	credential: string; // JWT ID token
	select_by: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [accessToken, setAccessToken] = useState<string>(
		localStorage.getItem("accessToken") || "",
	);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		!!localStorage.getItem("accessToken"),
	);
	const [hasUnlockedSolutions, setHasUnlockedSolutions] = useState<boolean>(
		localStorage.getItem("hasUnlockedSolutions") === "true",
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	// Check authentication status on mount
	useEffect(() => {
		const initAuth = async () => {
			const token = localStorage.getItem("accessToken");
			const refreshToken = localStorage.getItem("refreshToken");

			if (token) {
				const success = await fetchProfile(token);
				if (success) {
					setIsAuthenticated(true);
					setAccessToken(token);
				} else if (refreshToken) {
					// Token might be expired, try refresh
					const newToken = await refreshAccessToken(refreshToken);
					if (newToken) {
						setIsAuthenticated(true);
						setAccessToken(newToken);
						await fetchProfile(newToken);
					} else {
						logout();
					}
				} else {
					logout();
				}
			} else if (refreshToken) {
				// No access token but have refresh token
				const newToken = await refreshAccessToken(refreshToken);
				if (newToken) {
					setIsAuthenticated(true);
					setAccessToken(newToken);
					await fetchProfile(newToken);
				}
			}

			if (localStorage.getItem("hasUnlockedSolutions") === "true") {
				setHasUnlockedSolutions(true);
			}
			setLoading(false);
		};
		initAuth();
	}, []);

	const refreshAccessToken = async (refreshToken: string) => {
		try {
			const response = await fetch(`${baseURL}/auth/token/refresh/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ refresh: refreshToken }),
			});

			if (response.ok) {
				const data = await response.json();
				localStorage.setItem("accessToken", data.access);
				return data.access;
			}
		} catch (error) {
			console.error("Error refreshing token:", error);
		}
		return null;
	};

	const refreshUserInfo = async () => {
		const token = localStorage.getItem("accessToken");
		if (!token) return;

		try {
			const response = await fetch(`${baseURL}/auth/user/info/`, {
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/json",
				},
			});

			if (response.ok) {
				const data = await response.json();
				setHasUnlockedSolutions(data.has_unlocked_solutions);

				// Update all relevant localStorage fields
				localStorage.setItem(
					"hasUnlockedSolutions",
					String(data.has_unlocked_solutions),
				);
				if (data.username)
					localStorage.setItem("username", data.username);
				if (data.email) localStorage.setItem("email", data.email);
				if (data.points !== undefined)
					localStorage.setItem("points", String(data.points));
				if (data.streak !== undefined)
					localStorage.setItem("streak", String(data.streak));
			} else {
				console.error("Failed to refresh user info");
			}
		} catch (error) {
			console.error("Error refreshing user info:", error);
		}
	};

	const fetchProfile = async (token: string) => {
		try {
			const response = await fetch(`${baseURL}/auth/user/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const data = await response.json();
				setHasUnlockedSolutions(
					data.profile_data.has_unlocked_solutions,
				);
				localStorage.setItem(
					"hasUnlockedSolutions",
					String(data.profile_data.has_unlocked_solutions),
				);
				// Update other profile data if needed
				if (data.profile_data) {
					localStorage.setItem(
						"username",
						data.profile_data.username || "",
					);
					localStorage.setItem(
						"email",
						data.profile_data.email || "",
					);
				}
				return true;
			} else {
				// optional: if 401, maybe logout? generic for now just log
				console.error("Failed to fetch fresh profile");
				return false;
			}
		} catch (error) {
			console.error("Error fetching profile:", error);
			return false;
		}
	};

	const login = async (
		username: string,
		password: string,
		isRemember: boolean,
	) => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(`${baseURL}/auth/login/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});
			const data = await response.json();
			if (!response.ok || !data.access) {
				throw new Error(
					data.error || data.detail || "Invalid username or password",
				);
			}
			setIsAuthenticated(true);
			if (data.profile_data) {
				setHasUnlockedSolutions(
					data.profile_data.has_unlocked_solutions,
				);
			}
			setAccessToken(data.access);

			// Always store tokens and user data in localStorage to persist session across refreshes
			localStorage.setItem("accessToken", data.access);
			if (data.refresh) {
				localStorage.setItem("refreshToken", data.refresh);
			}
			if (data.profile_data) {
				localStorage.setItem(
					"hasUnlockedSolutions",
					String(data.profile_data.has_unlocked_solutions),
				);
				localStorage.setItem(
					"username",
					data.profile_data.username || "",
				);
				localStorage.setItem("email", data.profile_data.email || "");
			}
			return true;
		} catch (err) {
			setError((err as Error).message);
			setIsAuthenticated(false);
			setHasUnlockedSolutions(false);
			return false;
		} finally {
			setLoading(false);
		}
	};

	const register = async (
		username: string,
		email: string,
		password: string,
		confirmPassword: string,
	) => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(`${baseURL}/auth/register/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username,
					email,
					password,
					password2: confirmPassword,
				}),
			});
			const data = await response.json();

			if (!response.ok) {
				const errorMessage =
					data.error || data.detail || "Registration failed";
				setError(errorMessage);
				throw new Error(errorMessage);
			}

			// Return the data object directly on success
			return data;
		} catch (err) {
			console.log(err);
			// Only set error if not already set (though we set it above)
			if (!error) setError((err as Error).message);
			setIsAuthenticated(false);
			return false;
		} finally {
			setLoading(false);
		}
	};
	const socialSignup = async (response: GoogleCredentialResponse) => {
		// Decode JWT to get email
		const payload = JSON.parse(atob(response.credential.split(".")[1]));
		const email = payload.email;

		try {
			// POST to your backend endpoint
			const signupResponse = await fetch(
				`${baseURL}/auth/social/signup/`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email }),
				},
			);

			if (!signupResponse.ok) {
				throw new Error(`Backend error: ${signupResponse.status}`);
			}

			const backendData = await signupResponse.json();

			setIsAuthenticated(true);
			setHasUnlockedSolutions(
				backendData?.profile_data?.has_unlocked_solutions,
			);
			setAccessToken(backendData?.access_token);

			localStorage.setItem("accessToken", backendData?.access_token);
			localStorage.setItem(
				"hasUnlockedSolutions",
				String(backendData?.profile_data?.has_unlocked_solutions),
			);

			// Optionally store refresh token if provided
			if (backendData?.refresh_token) {
				localStorage.setItem(
					"refreshToken",
					backendData?.refresh_token,
				);
			}
			// Save username and email
			if (backendData?.profile_data) {
				localStorage.setItem(
					"username",
					backendData.profile_data.username || "",
				);
				localStorage.setItem(
					"email",
					backendData.profile_data.email || "",
				);
			}

			// On success, treat as login: toast and navigate
			toast.success("Signed in with Google!");
			navigate("/");
			return true;
		} catch (error) {
			console.error("Google Auth failed:", error);
			toast.error("Google sign in failed. Please try again.");
		}
	};

	const logout = () => {
		setAccessToken("");
		setIsAuthenticated(false);
		setHasUnlockedSolutions(false);
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("username");
		localStorage.removeItem("email");
		localStorage.removeItem("hasUnlockedSolutions");
		navigate("/auth");
	};

	const deleteAccount = async () => {
		const token = localStorage.getItem("accessToken");
		if (!token) return false;

		setLoading(true);
		try {
			const response = await fetch(`${baseURL}/auth/user/delete/`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				localStorage.clear();
				setAccessToken("");
				setIsAuthenticated(false);
				setHasUnlockedSolutions(false);
				toast.success("Account deleted successfully");
				navigate("/");
				return true;
			} else {
				const data = await response.json();
				throw new Error(data.error || "Failed to delete account");
			}
		} catch (err) {
			console.error("Error deleting account:", err);
			toast.error((err as Error).message);
			return false;
		} finally {
			setLoading(false);
		}
	};

	const requestPasswordReset = async (email: string) => {
		setLoading(true);
		try {
			const response = await fetch(
				`${baseURL}/auth/password-reset/request/`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email }),
				},
			);

			if (response.ok) {
				toast.success(
					"Password reset email sent. Please check your inbox.",
				);
				return true;
			} else {
				const data = await response.json();
				throw new Error(data.error || "Failed to send reset email");
			}
		} catch (err) {
			console.error("Error requesting password reset:", err);
			toast.error((err as Error).message);
			return false;
		} finally {
			setLoading(false);
		}
	};

	const confirmPasswordReset = async (
		uidb64: string,
		token: string,
		new_password: string,
	) => {
		setLoading(true);
		try {
			const response = await fetch(
				`${baseURL}/auth/password-reset/confirm/`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ uidb64, token, new_password }),
				},
			);

			if (response.ok) {
				toast.success("Password reset successful. You can now log in.");
				return true;
			} else {
				const data = await response.json();
				throw new Error(data.error || "Failed to reset password");
			}
		} catch (err) {
			console.error("Error confirming password reset:", err);
			toast.error((err as Error).message);
			return false;
		} finally {
			setLoading(false);
		}
	};

	const changePassword = async (
		old_password: string,
		new_password: string,
	) => {
		setLoading(true);
		try {
			if (!accessToken) throw new Error("No access token found");

			const response = await fetch(
				`${baseURL}/auth/user/change_password/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify({ old_password, new_password }),
				},
			);

			if (response.ok) {
				toast.success("Password changed successfully");
				return true;
			} else {
				const data = await response.json();
				throw new Error(data.error || "Failed to change password");
			}
		} catch (err) {
			console.error("Error changing password:", err);
			toast.error((err as Error).message);
			return false;
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				login,
				register,
				socialSignup,
				logout,
				error,
				loading,
				accessToken,
				isAuthenticated,
				hasUnlockedSolutions,
				fetchProfile: async (token) => {
					await fetchProfile(token);
				},
				refreshUserInfo,
				deleteAccount,
				requestPasswordReset,
				confirmPasswordReset,
				changePassword,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
