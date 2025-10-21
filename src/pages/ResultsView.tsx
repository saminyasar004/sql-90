import { useEffect } from "react";

export function ResultsView({ result }) {
	// Loading state
	if (result === null || result === undefined) {
		return (
			<div className="text-gray-500 animate-pulse">Checking query...</div>
		);
	}

	// Error state (if your API returns { error: ... })
	if (result.error) {
		return (
			<div className="text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
				{result.error}
			</div>
		);
	}

	// No results state
	if (result?.length === 0) {
		return <div className="text-gray-500">No results to display</div>;
	}

	return (
		<div className="border border-gray-300 rounded-md overflow-hidden">
			<div className="bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-300">
				Query Results
			</div>
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							{Object.keys(result[0]).map((column) => (
								<th
									key={column}
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									{column}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{result.map((row, rowIndex) => (
							<tr key={rowIndex}>
								{Object.values(row).map((value, colIndex) => (
									<td
										key={colIndex}
										className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
									>
										{value !== null
											? value.toString()
											: "NULL"}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
