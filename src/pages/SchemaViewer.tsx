import { schema } from "../data/schema";
export function SchemaViewer() {
	return (
		<div className="mt-2 p-4 border border-gray-200 rounded-md bg-gray-50">
			<h3 className="text-sm font-medium mb-2">Database Tables</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{schema.tables.map((table) => (
					<div
						key={table.name}
						className="bg-white p-3 rounded-md border border-gray-200"
					>
						<h4 className="font-medium text-[#008080] mb-1">
							{table.name}
						</h4>
						<div className="text-xs text-gray-500 mb-2">
							{table.description}
						</div>
						<table className="w-full text-xs">
							<thead>
								<tr className="border-b border-gray-200">
									<th className="text-left py-1 font-medium">
										Column
									</th>
									<th className="text-left py-1 font-medium">
										Type
									</th>
								</tr>
							</thead>
							<tbody>
								{table.columns.map((column) => (
									<tr
										key={column.name}
										className="border-b border-gray-100"
									>
										<td className="py-1">{column.name}</td>
										<td className="py-1 text-gray-500">
											{column.type}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				))}
			</div>
			<div className="mt-3 text-xs text-gray-500">
				<p>Note: All questions in SQL90 use this database schema.</p>
			</div>
		</div>
	);
}
