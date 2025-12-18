import React from "react";
import Editor from "@monaco-editor/react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface SQLEditorProps {
	value: string;
	onChange: (value: string) => void;
	dbType: string;
	setDbType: (value: string) => void;
}

export function SQLEditor({
	value,
	onChange,
	dbType,
	setDbType,
}: SQLEditorProps) {
	const handleEditorChange = (value: string | undefined) => {
		onChange(value || "");
	};

	// Map dbType to Monaco Editor languages
	const languageMap: Record<string, string> = {
		mysql: "mysql",
		postgresql: "pgsql",
	};

	return (
		<div className="border border-gray-300 rounded-md overflow-hidden bg-white shadow-sm">
			<style>{`
				@font-face {
					font-family: 'Fira Code';
					src: url('/fonts/fira-code/FiraCode-Light.ttf') format('truetype');
					font-weight: 300;
					font-style: normal;
					font-display: swap;
				}
				@font-face {
					font-family: 'Fira Code';
					src: url('/fonts/fira-code/FiraCode-Regular.ttf') format('truetype');
					font-weight: 400;
					font-style: normal;
					font-display: swap;
				}
				@font-face {
					font-family: 'Fira Code';
					src: url('/fonts/fira-code/FiraCode-Medium.ttf') format('truetype');
					font-weight: 500;
					font-style: normal;
					font-display: swap;
				}
				@font-face {
					font-family: 'Fira Code';
					src: url('/fonts/fira-code/FiraCode-SemiBold.ttf') format('truetype');
					font-weight: 600;
					font-style: normal;
					font-display: swap;
				}
				@font-face {
					font-family: 'Fira Code';
					src: url('/fonts/fira-code/FiraCode-Bold.ttf') format('truetype');
					font-weight: 700;
					font-style: normal;
					font-display: swap;
				}
				
				/* Force Monaco to use the font */
				.monaco-editor .view-lines, 
				.monaco-editor .mtk1,
				.monaco-editor .margin-view-overlays .line-numbers {
					font-family: 'Fira Code', monospace !important;
				}
			`}</style>
			<div className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-200 w-full flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="font-semibold text-gray-800">
						SQL Editor
					</span>
				</div>
				<Select defaultValue={dbType} onValueChange={setDbType}>
					<SelectTrigger className="w-[180px] h-8 bg-white border-gray-300 focus:ring-0 focus:ring-offset-0">
						<SelectValue placeholder="Select SQL Dialect" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Select SQL Dialect</SelectLabel>
							<SelectItem value="mysql">MySQL</SelectItem>
							<SelectItem value="postgresql">
								PostgreSQL
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<div className="h-[350px] w-full bg-white">
				<Editor
					height="350px"
					language={languageMap[dbType] || "sql"}
					value={value}
					theme="light"
					onChange={handleEditorChange}
					options={{
						fontFamily: "'Fira Code', monospace",
						fontSize: 14,
						fontLigatures: true,
						minimap: { enabled: false },
						scrollBeyondLastLine: false,
						automaticLayout: true,
						contextmenu: false,
					}}
				/>
			</div>
		</div>
	);
}
