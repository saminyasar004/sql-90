import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";
import { useAuth } from "../hooks/use-auth";
import { baseURL } from "@/config/dotenv";

export type QuestionDifficultyType = "Easy" | "Intermediate" | "Hard";

export interface QuestionProps {
	id: number;
	title: string;
	difficulty: QuestionDifficultyType;
	points: number;
	is_premium: boolean;
	status: "unseen" | "completed";
}

interface QuestionContextType {
	questions: QuestionProps[];
	fetchQuestions: () => Promise<void>;
	isLoading: boolean;
	error: string | null;
}

const QuestionContext = createContext<QuestionContextType | undefined>(
	undefined
);

export function QuestionProvider({ children }: { children: ReactNode }) {
	const { accessToken } = useAuth();
	const [questions, setQuestions] = useState<QuestionProps[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchQuestions = async () => {
		setIsLoading(true);
		setError(null);
		try {
			// ✅ Build headers conditionally
			const headers: HeadersInit = {
				"Content-Type": "application/json",
			};

			if (accessToken) {
				headers["Authorization"] = `Bearer ${accessToken}`;
			}

			const response = await fetch(`${baseURL}/api/problems/`, {
				method: "GET",
				headers,
			});

			if (!response.ok) {
				throw new Error("Failed to fetch questions");
			}

			const data = await response.json();
			setQuestions(data);
		} catch (err: any) {
			console.error("Error fetching questions:", err);
			setError(err.message || "Unknown error");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchQuestions();
	}, [accessToken]);

	return (
		<QuestionContext.Provider
			value={{ questions, fetchQuestions, isLoading, error }}
		>
			{children}
		</QuestionContext.Provider>
	);
}

export function useQuestion() {
	const context = useContext(QuestionContext);
	if (!context) {
		throw new Error("useQuestion must be used within a QuestionProvider");
	}
	return context;
}
