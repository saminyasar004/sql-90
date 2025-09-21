import { baseURL } from "@/config/dotenv";
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";

type AuthContextType = {
	user: string | null;
	error: string | null;
	loading: boolean;
	isAuthenticated: boolean;
	login: (
		username: string,
		password: string,
		isRemember: boolean
	) => Promise<boolean>;
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
	const [user, setUser] = useState<string | null>(null);
	const [accessToken, setAccessToken] = useState<string>("");
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const initAuth = async () => {
			const refreshToken = localStorage.getItem("refreshToken");
			if (refreshToken) {
				await refreshAccessToken();
			}
			setLoading(false);
		};
		initAuth();
	}, []);

	const refreshAccessToken = async () => {
		const refreshToken = localStorage.getItem("refreshToken");
		if (!refreshToken) return false;

		try {
			const response = await fetch(`${baseURL}/auth/refresh/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ refresh: refreshToken }),
			});
			const data = await response.json();
			if (!data.access) {
				throw new Error(data.detail || "Token refresh failed");
			}
			setAccessToken(data.access);

			// Fetch user details
			const userResponse = await fetch(`${baseURL}/auth/user/`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${data.access}`,
				},
			});
			const userData = await userResponse.json();
			if (!userData.username) {
				throw new Error("Invalid user data");
			}
			setUser(userData.username);
			setIsAuthenticated(true);
			return true;
		} catch (err) {
			setError((err as Error).message);
			localStorage.removeItem("refreshToken");
			setIsAuthenticated(false);
			return false;
		}
	};

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
			if (!data.access || !data.refresh) {
				throw new Error(data.error || data.detail || "Login failed");
			}
			if (data.status === 401) {
				throw new Error(data?.detail || "Invalid username or password");
			}
			setUser(data.user || username);
			setIsAuthenticated(true);
			setAccessToken(data.access);
			if (isRemember) {
				localStorage.setItem("refreshToken", data.refresh);
			} else {
				localStorage.removeItem("refreshToken");
			}
			return true;
		} catch (err) {
			setError((err as Error).message);
			return false;
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		setUser(null);
		setAccessToken("");
		setIsAuthenticated(false);
		localStorage.removeItem("refreshToken");
	};

	return (
		<AuthContext.Provider
			value={{ user, login, logout, error, loading, isAuthenticated }}
		>
			{children}
		</AuthContext.Provider>
	);
};
