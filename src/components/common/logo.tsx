import { Link } from "react-router-dom";

export function Logo() {
	return (
		<Link to={"/"}>
			<div className="flex flex-col">
				<div className="text-2xl font-bold">
					SQL<span className="text-[#62E647]">90</span>
				</div>
				<div className="text-xs text-white/70 -mt-1">
					The smarter way to practice SQL
				</div>
			</div>
		</Link>
	);
}
