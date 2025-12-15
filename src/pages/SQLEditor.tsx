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
import { Loader2 } from "lucide-react";

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
	return (
		<div className="border border-gray-300 rounded-md overflow-hidden bg-white shadow-sm">
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
			<div className="h-[350px] w-full">
				<Editor
					height="100%"
					language={dbType === "postgresql" ? "pgsql" : "mysql"}
					value={value}
					onChange={(value) => onChange(value || "")}
					theme="light"
					options={{
						minimap: { enabled: false },
						fontSize: 14,
						lineNumbers: "on",
						roundedSelection: true,
						scrollBeyondLastLine: false,
						readOnly: false,
						automaticLayout: true,
						fontFamily: "'Fira Code', monospace",
						cursorBlinking: "smooth",
						cursorSmoothCaretAnimation: "on",
						padding: { top: 16, bottom: 16 },
						renderLineHighlight: "none",
						guides: {
							indentation: false,
						},
						scrollbar: {
							alwaysConsumeMouseWheel: false,
						},
						quickSuggestions: {
							other: true,
							comments: true,
							strings: true,
						},
						suggestOnTriggerCharacters: true,
						wordBasedSuggestions: "allDocuments",
						parameterHints: { enabled: true },
						suggest: {
							showKeywords: true,
							showSnippets: true,
						},
						tabCompletion: "on",
					}}
					loading={
						<div className="flex items-center justify-center h-full text-gray-500 bg-gray-50/50">
							<Loader2 className="w-5 h-5 animate-spin mr-2" />
							<span>Loading Editor...</span>
						</div>
					}
				/>
			</div>
		</div>
	);
}
