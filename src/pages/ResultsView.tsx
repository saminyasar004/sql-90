export function ResultsView({ result }) {
	if (!result || !result.columns || !result.rows) {
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
							{result.columns.map((column, i) => (
								<th
									key={i}
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									{column}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{result.rows.map((row, i) => (
							<tr key={i}>
								{result.columns.map((column, j) => (
									<td
										key={j}
										className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
									>
										{row[column]}
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
