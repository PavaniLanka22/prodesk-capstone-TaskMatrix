import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };

    return (

        <div className="navbar">

            <div className="search-box">

                <FiSearch />

                <input
                    type="text"
                    placeholder="Search projects, tasks..."
/>

            </div>

            <div className="navbar-right">

                <button className="icon-btn">

                    ⚪🔔

                </button>

                <div className="avatar">

                        {user?.name
    ?.split(" ")
    .map(word => word[0])
    .join("")
    .substring(0,2)
    .toUpperCase()}
                </div>

                <span className="username">

                    {user?.name}

                </span>

                <button
                    className="logout-btn"
                    onClick={logout}
                >

                    Logout

                </button>

            </div>

        </div>

    );

}

export default Navbar;