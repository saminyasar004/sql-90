import { baseURL } from "@/config/dotenv";
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

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
	logout: () => void;
};

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
			console.log("response: ", data);
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
			console.log("response: ", data);
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
