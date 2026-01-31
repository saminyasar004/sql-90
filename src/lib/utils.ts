import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatUsername(username: string | null): string {
	if (!username) return "User";
	return username.split("@")[0];
}
