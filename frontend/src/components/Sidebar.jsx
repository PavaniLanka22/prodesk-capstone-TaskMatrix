import { Link, useLocation } from "react-router-dom";

function Sidebar() {

    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", path: "/dashboard", icon: "🏠" },
        { name: "Projects", path: "/projects", icon: "📁" },
        { name: "Tasks", path: "#", icon: "✅" },
        { name: "Kanban", path: "#", icon: "📋" },
        { name: "Team", path: "#", icon: "👥" },
        { name: "Settings", path: "#", icon: "⚙️" }
    ];

    return (

        <aside className="sidebar">

            <div className="sidebar-logo">

                <img
                    src="/kanban.svg"
                    alt="TaskMatrix"
                />

                <h2>TaskMatrix</h2>

            </div>

            <nav>

                {menuItems.map((item) => (

                    <Link
                        key={item.name}
                        to={item.path}
                        className={
                            location.pathname === item.path
                                ? "menu active"
                                : "menu"
                        }
                    >

                        <span>{item.icon}</span>

                        {item.name}

                    </Link>

                ))}

            </nav>

        </aside>

    );

}

export default Sidebar;