import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism.css";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function SQLEditor({ value, onChange, dbType, setDbType }) {
	// Calculate line numbers for the current code
	const getLineNumbers = (code) => {
		const lines = code.split("\n");
		return lines.map((_, i) => i + 1).join("\n");
	};

	return (
		<div className="border border-gray-300 rounded-md overflow-hidden">
			<div className="bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-300 w-full flex items-center justify-between">
				<div className="">SQL Editor</div>
				<Select defaultValue={dbType} onValueChange={setDbType}>
					<SelectTrigger className="w-[180px]">
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
			<div className="bg-white flex">
				{/* Line numbers */}
				<div className="text-right pr-3 pt-4 pb-4 pl-3 bg-gray-50 border-r border-gray-200 select-none">
					{getLineNumbers(value || "\n")}
				</div>
				{/* Editor */}
				<div className="flex-1">
					<Editor
						value={value}
						onValueChange={onChange}
						highlight={(code) =>
							highlight(code, languages.sql, "sql")
						}
						padding={16}
						style={{
							fontFamily:
								'"JetBrains Mono", "Fira Code", "Consolas", "Monaco", "Andale Mono", monospace',
							fontSize: 14,
							minHeight: "200px",
						}}
						className="w-full font-mono"
						placeholder="Write your SQL query here..."
					/>
				</div>
			</div>
			<style>
				{`
        .token.keyword {
          color: #0076c6;
          font-weight: bold;
          font-family: "Giest Mono", monospace;
        }
        .token.function {
          color: #dd4a68;
          font-family: "Giest Mono", monospace;
        }
        .token.string {
          color: #690;
          font-family: "Giest Mono", monospace;
        }
        .token.number {
          color: #905;
          font-family: "Giest Mono", monospace;
        }
        .token.operator {
          color: #9a6e3a;
          font-family: "Giest Mono", monospace;
        }
        .token.comment {
          color: slategray;
          font-style: italic;
          font-family: "Giest Mono", monospace;
        }
        /* Remove the focus outline on the editor */
        textarea:focus,
        textarea:active {
          outline: none !important;
        }
        /* Line number styling */
        .text-right {
          color: #888;
          font-family:
            'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Andale Mono',
            monospace;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre;
        }
        /* Make sure textarea and highlighting have the same line height */
        .prism-editor__textarea,
        .prism-editor__editor {
          line-height: 1.5 !important;
        }
        /* Make editor height responsive */
        @media (min-width: 640px) {
          .prism-editor__textarea,
          .prism-editor__editor {
            min-height: 320px !important;
          }
        }
      `}
			</style>
		</div>
	);
}
