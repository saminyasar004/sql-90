import React, { useEffect, useState, createContext, useContext } from "react";
import { useQuestion } from "./use-question";
import { baseURL } from "@/config/dotenv";
type ToastType = {
	id: string;
	message: string;
	type?: "success" | "info";
};
type GameContextType = {
	totalPoints: number;
	streak: number;
	completedQuestions: number;
	completedPercentage: number;
	addPoints: (points: number) => void;
	// markQuestionComplete: (questionId: number) => void;
	toasts: ToastType[];
	addToast: (message: string, type?: "success" | "info") => void;
	removeToast: (id: string) => void;
};
const GameContext = createContext<GameContextType | undefined>(undefined);
export function useGame() {
	const context = useContext(GameContext);
	if (context === undefined) {
		throw new Error("useGame must be used within a GameProvider");
	}
	return context;
}
export function GameProvider({ children }: { children: React.ReactNode }) {
	const [totalPoints, setTotalPoints] = useState(0);
	const [streak, setStreak] = useState(0);
	const [completedQuestions, setCompletedQuestions] = useState<number>(0);
	const [completedPercentage, setCompletedPercentage] = useState<number>(0);
	const [toasts, setToasts] = useState<ToastType[]>([]);
	const { questions } = useQuestion();

	const fetchUserProgress = async () => {
		try {
			const response = await fetch(`${baseURL}/auth/user/progress/`);

			if (!response || response?.status !== 200) {
				throw new Error("Failed to fetch user progress");
			}

			const data = await response.json();

			setTotalPoints(data?.points);
			setStreak(data?.streak);
			setCompletedQuestions(data?.completed_questions);
			setCompletedQuestions(data?.completion_percentage);
		} catch (err: any) {
			console.log("Error occures on getting user progress: ");
			console.log(err.message);
		}
	};

	// Calculate initial points based on completed questions
	// useEffect(() => {
	// 	const initialPoints = questions
	// 		.filter((q) => q.completed)
	// 		.reduce((sum, q) => {
	// 			if (q.id <= 40) return sum + 10;
	// 			if (q.id <= 70) return sum + 20;
	// 			return sum + 40;
	// 		}, 0);
	// 	setTotalPoints(initialPoints);
	// 	setCompletedQuestions(
	// 		questions.filter((q) => q.completed).map((q) => q.id)
	// 	);
	// }, []);

	const addPoints = (points: number) => {
		setTotalPoints((prev) => prev + points);
	};

	// const markQuestionComplete = (questionId: number) => {
	// 	if (completedQuestions.includes(questionId)) return;
	// 	// Add to completed questions
	// 	setCompletedQuestions((prev) => [...prev, questionId]);
	// 	// Add points based on difficulty
	// 	if (questionId <= 40) {
	// 		addPoints(10);
	// 	} else if (questionId <= 70) {
	// 		addPoints(20);
	// 	} else {
	// 		addPoints(40);
	// 	}
	// 	// Check for milestones and show appropriate toast
	// 	const totalCompleted = completedQuestions.length + 1;
	// 	const percentComplete = Math.round(
	// 		(totalCompleted / questions.length) * 100
	// 	);
	// 	// Milestone notifications
	// 	if (percentComplete === 5) {
	// 		addToast("🔥 Nice work, you've completed 5%!");
	// 	} else if (percentComplete === 10) {
	// 		addToast("👏 You're crushing it! 10% complete!");
	// 	} else if (percentComplete === 25) {
	// 		addToast("🚀 A quarter of the way there! Keep going!");
	// 	} else if (percentComplete === 50) {
	// 		addToast("🏆 Halfway there! You're a SQL champion!");
	// 	} else if (percentComplete === 75) {
	// 		addToast("⭐ 75% complete! The finish line is in sight!");
	// 	} else if (percentComplete === 100) {
	// 		addToast("🎉 Congratulations! You've completed all questions!");
	// 	}
	// 	// Difficulty-based milestones
	// 	const easyCompleted =
	// 		completedQuestions.filter((id) => id <= 40).length +
	// 		(questionId <= 40 ? 1 : 0);
	// 	const intermediateCompleted =
	// 		completedQuestions.filter((id) => id > 40 && id <= 70).length +
	// 		(questionId > 40 && questionId <= 70 ? 1 : 0);
	// 	const hardCompleted =
	// 		completedQuestions.filter((id) => id > 70).length +
	// 		(questionId > 70 ? 1 : 0);
	// 	if (
	// 		easyCompleted === 20 &&
	// 		easyCompleted - (questionId <= 40 ? 1 : 0) < 20
	// 	) {
	// 		addToast("💡 You're halfway through the Easy set!");
	// 	} else if (
	// 		easyCompleted === 40 &&
	// 		easyCompleted - (questionId <= 40 ? 1 : 0) < 40
	// 	) {
	// 		addToast(
	// 			"🌟 You've completed all Easy questions! Ready for a challenge?"
	// 		);
	// 	} else if (
	// 		intermediateCompleted === 15 &&
	// 		intermediateCompleted -
	// 			(questionId > 40 && questionId <= 70 ? 1 : 0) <
	// 			15
	// 	) {
	// 		addToast(
	// 			"🔥 Halfway through Intermediate! You're getting good at this!"
	// 		);
	// 	} else if (
	// 		intermediateCompleted === 30 &&
	// 		intermediateCompleted -
	// 			(questionId > 40 && questionId <= 70 ? 1 : 0) <
	// 			30
	// 	) {
	// 		addToast("💪 All Intermediate questions done! You're a SQL pro!");
	// 	} else if (
	// 		hardCompleted === 10 &&
	// 		hardCompleted - (questionId > 70 ? 1 : 0) < 10
	// 	) {
	// 		addToast("🧠 Halfway through Hard questions! Impressive skills!");
	// 	} else if (
	// 		hardCompleted === 20 &&
	// 		hardCompleted - (questionId > 70 ? 1 : 0) < 20
	// 	) {
	// 		addToast(
	// 			"🏅 You've mastered all Hard questions! You're a SQL expert!"
	// 		);
	// 	}
	// };

	const addToast = (
		message: string,
		type: "success" | "info" = "success"
	) => {
		const id = Date.now().toString();
		setToasts((prev) => [
			...prev,
			{
				id,
				message,
				type,
			},
		]);
		// Auto-remove toast after 5 seconds
		setTimeout(() => {
			removeToast(id);
		}, 5000);
	};
	const removeToast = (id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	};
	return (
		<GameContext.Provider
			value={{
				totalPoints,
				streak,
				completedQuestions,
				completedPercentage,
				addPoints,
				// markQuestionComplete,
				toasts,
				addToast,
				removeToast,
			}}
		>
			{children}
		</GameContext.Provider>
	);
}
