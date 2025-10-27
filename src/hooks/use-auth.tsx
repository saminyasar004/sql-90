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
	login: (
		username: string,
		password: string,
		isRemember: boolean
	) => Promise<boolean>;
	register: (
		username: string,
		email: string,
		password: string,
		confirmPassword: string
	) => Promise<string | boolean>;
	socialSignup: (response: GoogleCredentialResponse) => Promise<boolean>;
	logout: () => void;
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
		localStorage.getItem("accessToken") || ""
	);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		!!localStorage.getItem("accessToken")
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	// Check authentication status on mount
	useEffect(() => {
		const initAuth = async () => {
			// If accessToken exists in localStorage, assume user is authenticated
			if (localStorage.getItem("accessToken")) {
				setIsAuthenticated(true);
			}
			setLoading(false);
		};
		initAuth();
	}, []);

	const login = async (
		username: string,
		password: string,
		isRemember: boolean
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
					data.error || data.detail || "Invalid username or password"
				);
			}
			setIsAuthenticated(true);
			setAccessToken(data.access);
			// Store access token in localStorage if isRemember is true
			if (isRemember) {
				localStorage.setItem("accessToken", data.access);
				// Optionally store refresh token if provided
				if (data.refresh) {
					localStorage.setItem("refreshToken", data.refresh);
				}
			}
			return true;
		} catch (err) {
			setError((err as Error).message);
			setIsAuthenticated(false);
			return false;
		} finally {
			setLoading(false);
		}
	};

	const register = async (
		username: string,
		email: string,
		password: string,
		confirmPassword: string
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
			if (!response.ok || !data.access || response.status !== 200) {
				setError(data.error || data.detail || "Internal Server Error");
				throw new Error(
					data.error || data.detail || "Internal Server Error"
				);
			}

			return true;
		} catch (err) {
			console.log(err);
			setError((err as Error).message);
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
				}
			);

			if (!signupResponse.ok) {
				throw new Error(`Backend error: ${signupResponse.status}`);
			}

			const backendData = await signupResponse.json();

			setIsAuthenticated(true);
			setAccessToken(backendData?.access_token);

			localStorage.setItem("accessToken", backendData?.access_token);
			// Optionally store refresh token if provided
			if (backendData?.refresh_token) {
				localStorage.setItem(
					"refreshToken",
					backendData?.refresh_token
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
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		navigate("/auth");
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
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
