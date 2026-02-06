import React, { useMemo, useEffect } from "react";
import { useQuestion } from "@/hooks/use-question";
import { useGame } from "@/hooks/use-game";
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
	const { certificateData, fetchCertificateAndBadges } = useGame();

	useEffect(() => {
		if (!certificateData) {
			fetchCertificateAndBadges();
		}
	}, []);

	const badges = useMemo(() => {
		// If we have API data, use it as primary source
		if (certificateData?.badges) {
			const colorMap: Record<string, string> = {
				"SQL Novice": "#10B981",
				"SQL Intermediate": "#F59E0B",
				"SQL Advanced": "#3B82F6",
				"Join Master": "#F97316",
				"Window Wizard": "#94A3B8",
			};

			const descMap: Record<string, string> = {
				"SQL Novice": "Complete questions 1-40",
				"SQL Intermediate": "Complete questions 41-70",
				"SQL Advanced": "Complete questions 71-90",
				"Join Master": "At least 20 join questions",
				"Window Wizard": "At least 10 window function questions",
			};

			return certificateData.badges.map((b: any) => ({
				title: b.name,
				description: descMap[b.name] || "",
				currentProgress: b.progress,
				totalProgress: b.total,
				color: colorMap[b.name] || "#94A3B8",
				isActive: b.progress > 0,
			}));
		}

		// Fallback to local calculation if API is unavailable or loading
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

		// Join Master IDs provided by user
		const joinIds = [
			7, 8, 10, 15, 18, 29, 30, 36, 37, 40, 41, 43, 44, 46, 47, 49, 50,
			51, 55, 56, 57, 58, 59, 60, 61, 63, 65, 67, 68, 70, 71, 74, 75, 76,
			78, 79, 80, 82, 83, 84, 85, 87, 88, 89,
		];
		const joinCompleted = joinIds.filter((id) =>
			completedIds.has(id),
		).length;
		const joinTarget = 20;

		// Window Wizard IDs provided by user
		const windowIds = [
			50, 52, 53, 54, 57, 61, 68, 71, 72, 76, 78, 81, 83, 85, 86, 88, 90,
		];
		const windowCompleted = windowIds.filter((id) =>
			completedIds.has(id),
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
				description: "At least 10 window function questions",
				currentProgress: Math.min(windowCompleted, windowTarget),
				totalProgress: windowTarget,
				color: "#94A3B8", // Silver/Grey
				isActive: windowCompleted > 0,
			},
		];
	}, [questions, certificateData]);

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
