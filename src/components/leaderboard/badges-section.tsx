import React, { useMemo } from "react";
import { useQuestion } from "@/hooks/use-question";
import { cn } from "@/lib/utils";

interface BadgeProps {
	title: string;
	description: string;
	currentProgress: number;
	totalProgress: number;
	color: string;
	isActive: boolean;
}

function Badge({
	title,
	description,
	currentProgress,
	totalProgress,
	color,
	isActive,
}: BadgeProps) {
	return (
		<div className="flex flex-col items-center text-center space-y-3">
			<div
				className={cn(
					"w-24 h-24 rounded-full border-[6px] flex items-center justify-center transition-all duration-300 bg-white",
					isActive ? "shadow-sm" : "opacity-40 grayscale-[0.5]",
				)}
				style={{ borderColor: color, color: color }}
			>
				{/* Custom Medal/Ribbon SVG to match design */}
				<svg
					width="42"
					height="42"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="12" cy="8" r="6" />
					<path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
				</svg>
			</div>
			<div className="flex flex-col items-center space-y-1">
				<h3
					className="text-[15px] font-bold tracking-tight"
					style={{ color: color }}
				>
					{title}
				</h3>
				<p className="text-[12px] text-slate-400 font-medium whitespace-nowrap">
					{description}
				</p>
				<p className="text-[12px] font-bold" style={{ color: color }}>
					{currentProgress}/{totalProgress}
				</p>
			</div>
		</div>
	);
}

export function BadgesSection() {
	const { questions } = useQuestion();

	const badges = useMemo(() => {
		const completedIds = new Set(
			questions.filter((q) => q.status === "completed").map((q) => q.id),
		);

		// Novice: Q 1-40
		const noviceCompleted = questions.filter(
			(q) => q.id >= 1 && q.id <= 40 && completedIds.has(q.id),
		).length;

		// Intermediate: Q 41-70
		const intermediateCompleted = questions.filter(
			(q) => q.id >= 41 && q.id <= 70 && completedIds.has(q.id),
		).length;

		// Advanced: Q 71-90
		const advancedCompleted = questions.filter(
			(q) => q.id >= 71 && q.id <= 90 && completedIds.has(q.id),
		).length;

		// Join Master: 20 Join questions (Assume questions containing 'Join' in title or similar logic)
		// For now, let's use a heuristic or list.
		// I'll filter by title containing 'Join'
		const joinQuestions = questions.filter((q) =>
			q.title.toLowerCase().includes("join"),
		);
		const joinCompleted = joinQuestions.filter((q) =>
			completedIds.has(q.id),
		).length;
		const joinTarget = 20;

		// Window Wizard: 10 Window Function questions
		const windowQuestions = questions.filter(
			(q) =>
				q.title.toLowerCase().includes("window") ||
				q.title.toLowerCase().includes("rank") ||
				q.title.toLowerCase().includes("dense") ||
				q.title.toLowerCase().includes("over"),
		);
		const windowCompleted = windowQuestions.filter((q) =>
			completedIds.has(q.id),
		).length;
		const windowTarget = 10;

		return [
			{
				title: "SQL Novice",
				description: "Complete questions 1-40",
				currentProgress: noviceCompleted,
				totalProgress: 40,
				color: "#10B981", // Teal
				isActive: noviceCompleted > 0,
			},
			{
				title: "SQL Intermediate",
				description: "Complete questions 41-70",
				currentProgress: intermediateCompleted,
				totalProgress: 30,
				color: "#F59E0B", // Amber
				isActive: intermediateCompleted > 0,
			},
			{
				title: "SQL Advanced",
				description: "Complete questions 71-90",
				currentProgress: advancedCompleted,
				totalProgress: 20,
				color: "#3B82F6", // Blue
				isActive: advancedCompleted > 0,
			},
			{
				title: "Join Master",
				description: "Complete 20 Join questions",
				currentProgress: Math.min(joinCompleted, joinTarget),
				totalProgress: joinTarget,
				color: "#F97316", // Orange
				isActive: joinCompleted > 0,
			},
			{
				title: "Window Wizard",
				description: "10 Window Function questions",
				currentProgress: Math.min(windowCompleted, windowTarget),
				totalProgress: windowTarget,
				color: "#94A3B8", // Silver/Grey
				isActive: windowCompleted > 0,
			},
		];
	}, [questions]);

	return (
		<div className="w-full font-sans mb-16 mt-8">
			<h2 className="text-xl font-bold text-[#1E293B] mb-8">
				Your Badges
			</h2>
			<div className="grid grid-cols-2 md:grid-cols-5 gap-y-12 gap-x-4 bg-white p-2 rounded-2xl">
				{badges.map((badge, index) => (
					<Badge key={index} {...badge} />
				))}
			</div>
		</div>
	);
}
