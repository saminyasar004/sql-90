import { useState, createContext, useContext, ReactNode } from "react";
import { baseURL } from "@/config/dotenv";
import { useAuth } from "./use-auth";

type ToastType = {
	id: string;
	message: string;
	type?: "success" | "info";
};

interface GameContextType {
	totalPoints: number;
	streak: number;
	accuracy: number;
	your_position: number;
	completedQuestions: number;
	completedPercentage: number;
	addPoints: (points: number) => void;
	fetchUserProgress: () => Promise<void>;
	toasts: ToastType[];
	addToast: (message: string, type?: "success" | "info") => void;
	removeToast: (id: string) => void;
	certificateData: any;
	fetchCertificateAndBadges: () => Promise<void>;
	updateCertificateName: (name: string) => Promise<boolean>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function useGame() {
	const context = useContext(GameContext);
	if (!context) {
		throw new Error("useGame must be used within a GameProvider");
	}
	return context;
}

export function GameProvider({ children }: { children: ReactNode }) {
	const { accessToken } = useAuth();

	const [totalPoints, setTotalPoints] = useState(0);
	const [streak, setStreak] = useState(0);
	const [completedQuestions, setCompletedQuestions] = useState(0);
	const [completedPercentage, setCompletedPercentage] = useState(0);
	const [accuracy, setAccuracy] = useState(0);
	const [your_position, setYourPosition] = useState(0);
	const [toasts, setToasts] = useState<ToastType[]>([]);
	const [certificateData, setCertificateData] = useState<any>(null);

	// ✅ consistent header handling
	const fetchUserProgress = async () => {
		try {
			const headers: HeadersInit = { "Content-Type": "application/json" };
			if (accessToken) {
				headers["Authorization"] = `Bearer ${accessToken}`;
			}

			const response = await fetch(`${baseURL}/auth/user/progress/`, {
				method: "GET",
				headers,
			});

			if (!response.ok) {
				throw new Error("Failed to fetch user progress");
			}

			const data = await response.json();

			setTotalPoints(data?.points || 0);
			setStreak(data?.streak || 0);
			setCompletedQuestions(data?.completed_questions || 0);
			setCompletedPercentage(data?.completion_percentage || 0);
			setAccuracy(data?.accuracy || 0);
			setYourPosition(data?.your_position || 0);
		} catch (err: any) {
			console.error("Error fetching user progress:", err.message);
		}
	};

	const addPoints = (points: number) => {
		setTotalPoints((prev) => prev + points);
	};

	const addToast = (
		message: string,
		type: "success" | "info" = "success",
	) => {
		const id = Date.now().toString();
		setToasts((prev) => [...prev, { id, message, type }]);

		// Auto-remove toast after 5s
		setTimeout(() => {
			removeToast(id);
		}, 5000);
	};

	const removeToast = (id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	};

	const fetchCertificateAndBadges = async () => {
		try {
			const headers: HeadersInit = { "Content-Type": "application/json" };
			if (accessToken) {
				headers["Authorization"] = `Bearer ${accessToken}`;
			}

			const response = await fetch(
				`${baseURL}/api/certificate-and-badges/`,
				{
					method: "GET",
					headers,
				},
			);

			if (!response.ok) {
				throw new Error("Failed to fetch certificate and badges");
			}

			const data = await response.json();
			setCertificateData(data);
		} catch (err: any) {
			console.error("Error fetching certificate data:", err.message);
		}
	};

	const updateCertificateName = async (name: string) => {
		try {
			const headers: HeadersInit = { "Content-Type": "application/json" };
			if (accessToken) {
				headers["Authorization"] = `Bearer ${accessToken}`;
			}

			const response = await fetch(`${baseURL}/api/update_full_name/`, {
				method: "PATCH",
				headers,
				body: JSON.stringify({ full_name: name }),
			});

			if (response.ok) {
				setCertificateData((prev: any) => ({
					...prev,
					full_name: name,
					name_on_certificate: name,
				}));
				return true;
			}
			return false;
		} catch (err: any) {
			console.error("Error updating certificate name:", err.message);
			return false;
		}
	};

	return (
		<GameContext.Provider
			value={{
				totalPoints,
				streak,
				completedQuestions,
				completedPercentage,
				accuracy,
				your_position,
				addPoints,
				fetchUserProgress,
				toasts,
				addToast,
				removeToast,
				certificateData,
				fetchCertificateAndBadges,
				updateCertificateName,
			}}
		>
			{children}
		</GameContext.Provider>
	);
}
