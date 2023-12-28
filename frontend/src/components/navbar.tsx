import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="row w-100 border border-3 m-0" >
            <Link className="col" to="/">
                <h2>coffee-inventory</h2>
            </Link>
            <Link className="col" to="/coffee">
                <h2>kawa</h2>
            </Link>
            <Link className="col" to="/inventory">
                <h2>inwentarz</h2>
            </Link>
            <Link className="col" to="/brews">
                <h2>parzenie</h2>
            </Link>
        </div>
    );
}