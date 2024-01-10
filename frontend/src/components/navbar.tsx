import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="flex-wrap d-flex justify-content-between flex-row w-100 border-bottom border-2 border-primary shadow-sm m-0 bg-body" >
            <Link className="px-1" to="/">
                <h3>coffee-inventory</h3>
            </Link>
            <Link className="px-2" to="/coffee">
                <h3>kawa</h3>
            </Link>
            <Link className="px-2" to="/inventory">
                <h3>inwentarz</h3>
            </Link>
            <Link className="px-2" to="/brews">
                <h3>parzenie</h3>
            </Link>
        </div>
    );
}