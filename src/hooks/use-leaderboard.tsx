import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
	useCallback,
} from "react";
import { useAuth } from "../hooks/use-auth";
import { baseURL } from "@/config/dotenv";

export interface Leaderboard {
	username: string;
	points: number;
	completed_count: number;
	accuracy: number;
}

interface LeaderboardContextType {
	leaderboard: Leaderboard[];
	loading: boolean;
	error: string | null;
	refetchLeaderboard: () => Promise<void>;
}

const LeaderboardContext = createContext<LeaderboardContextType | undefined>(
	undefined,
);

export function LeaderboardProvider({ children }: { children: ReactNode }) {
	const { accessToken } = useAuth();
	const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchLeaderboard = useCallback(async () => {
		if (!accessToken) {
			setLoading(false);
			return;
		}

		setLoading(true);
		setError(null);
		try {
			const response = await fetch(`${baseURL}/api/leaderboard/`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			if (!response.ok) {
				throw new Error("Failed to fetch leaderboard");
			}
			const data = await response.json();
			setLeaderboard(data);
		} catch (err: any) {
			console.log("Error fetching leaderboard: ", err);
			setError(err.message || "Unknown error");
		} finally {
			setLoading(false);
		}
	}, [accessToken]);

	useEffect(() => {
		fetchLeaderboard();
	}, [fetchLeaderboard]);

	return (
		<LeaderboardContext.Provider
			value={{
				leaderboard,
				loading,
				error,
				refetchLeaderboard: fetchLeaderboard,
			}}
		>
			{children}
		</LeaderboardContext.Provider>
	);
}

export function useLeaderboard() {
	const context = useContext(LeaderboardContext);
	if (!context) {
		throw new Error(
			"useLeaderboard must be used within a LeaderboardProvider",
		);
	}
	return context;
}
