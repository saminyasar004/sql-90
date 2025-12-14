import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ResultsView({ result }) {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	// Reset to first page when results change
	useEffect(() => {
		setCurrentPage(1);
	}, [result]);

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

	const rowCount = result.length;
	const colCount = result.length > 0 ? Object.keys(result[0]).length : 0;
	const totalPages = Math.ceil(rowCount / itemsPerPage);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = result.slice(indexOfFirstItem, indexOfLastItem);

	const handlePrevPage = () => {
		setCurrentPage((prev) => Math.max(prev - 1, 1));
	};

	const handleNextPage = () => {
		setCurrentPage((prev) => Math.min(prev + 1, totalPages));
	};

	return (
		<div className="border border-gray-300 rounded-md overflow-hidden bg-white">
			<div className="bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-300 flex justify-between items-center">
				<span>
					Query Results ({rowCount} rows, {colCount} columns)
				</span>
				<span className="text-xs text-gray-500">
					Page {currentPage} of {totalPages}
				</span>
			</div>
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							{Object.keys(result[0]).map((column) => (
								<th
									key={column}
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
								>
									{column}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{currentItems.map((row, rowIndex) => (
							<tr key={rowIndex} className="hover:bg-gray-50">
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

			{/* Pagination Controls */}
			{totalPages > 1 && (
				<div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 sm:px-6">
					<div className="flex-1 flex justify-between sm:hidden">
						<button
							onClick={handlePrevPage}
							disabled={currentPage === 1}
							className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Previous
						</button>
						<button
							onClick={handleNextPage}
							disabled={currentPage === totalPages}
							className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Next
						</button>
					</div>
					<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
						<div>
							<p className="text-sm text-gray-700">
								Showing{" "}
								<span className="font-medium">
									{indexOfFirstItem + 1}
								</span>{" "}
								to{" "}
								<span className="font-medium">
									{Math.min(indexOfLastItem, rowCount)}
								</span>{" "}
								of{" "}
								<span className="font-medium">{rowCount}</span>{" "}
								results
							</p>
						</div>
						<div>
							<nav
								className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
								aria-label="Pagination"
							>
								<button
									onClick={handlePrevPage}
									disabled={currentPage === 1}
									className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<span className="sr-only">Previous</span>
									<ChevronLeft className="h-5 w-5" />
								</button>
								<button
									onClick={handleNextPage}
									disabled={currentPage === totalPages}
									className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<span className="sr-only">Next</span>
									<ChevronRight className="h-5 w-5" />
								</button>
							</nav>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
