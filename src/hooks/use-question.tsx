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

	useEffect(() => {
		// if (!accessToken) {
		// 	setIsLoading(false);
		// 	return;
		// }

		const fetchQuestions = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await fetch(`${baseURL}/api/problems/`, {
					// headers: {
					// 	Authorization: `Bearer ${accessToken}`,
					// },
				});
				if (!response.ok) {
					throw new Error("Failed to fetch questions");
				}
				const data = await response.json();
				setQuestions(data);
			} catch (err: any) {
				console.log("Error fetching questions: ", err);
				setError(err.message || "Unknown error");
			} finally {
				setIsLoading(false);
			}
		};

		fetchQuestions();
	}, [accessToken]);

	return (
		<QuestionContext.Provider value={{ questions, isLoading, error }}>
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
