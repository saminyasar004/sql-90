import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { EditorView } from "@codemirror/view";

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
					<span className="font-semibold text-gray-800 font-mono">
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
			<div className="h-[350px] w-full font-mono text-sm bg-white">
				<CodeMirror
					value={value}
					height="350px"
					theme="light"
					extensions={[
						sql({
							dialect:
								dbType === "postgresql"
									? undefined // Use default or specific PG dialect if available in future
									: undefined, // Defaults to standard SQL, good enough for now or configure specifically
						}),
						EditorView.theme({
							"&": {
								fontFamily: "'Fira Code', monospace !important",
								fontSize: "14px",
							},
							".cm-content": {
								fontFamily: "'Fira Code', monospace !important",
							},
							".cm-scroller": {
								fontFamily: "'Fira Code', monospace !important",
							},
						}),
					]}
					onChange={(val) => onChange(val)}
					basicSetup={{
						lineNumbers: true,
						highlightActiveLineGutter: true,
						highlightSpecialChars: true,
						history: true,
						foldGutter: true,
						drawSelection: true,
						dropCursor: true,
						allowMultipleSelections: true,
						indentOnInput: true,
						syntaxHighlighting: true,
						bracketMatching: true,
						closeBrackets: true,
						autocompletion: true,
						rectangularSelection: true,
						crosshairCursor: true,
						highlightActiveLine: true,
						highlightSelectionMatches: true,
						closeBracketsKeymap: true,
						defaultKeymap: true,
						searchKeymap: true,
						historyKeymap: true,
						foldKeymap: true,
						completionKeymap: true,
						lintKeymap: true,
					}}
				/>
			</div>
		</div>
	);
}
