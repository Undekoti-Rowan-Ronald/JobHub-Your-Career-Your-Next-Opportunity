import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">

            <div className="navbar-container">

                <Link to="/" className="logo">
                    JobListings
                </Link>

                <div className="nav-links">

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/add-job">
                        Add Job
                    </Link>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;