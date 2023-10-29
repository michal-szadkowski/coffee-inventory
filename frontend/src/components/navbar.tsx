import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<div className="container row w-100 border border-3" >
			<Link className="col" to="">
				<h2>MATH-blog</h2>
			</Link>

		</div>
	);
}