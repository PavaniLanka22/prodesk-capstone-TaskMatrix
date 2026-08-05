import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="dashboard-container">

            <Sidebar
                isOpen={sidebarOpen}
                closeSidebar={() => setSidebarOpen(false)}
            />

            <div className="main-content">

                <Navbar
                    toggleSidebar={() =>
                        setSidebarOpen(!sidebarOpen)
                    }
                />

                {children}

            </div>

        </div>

    );

}

export default MainLayout;