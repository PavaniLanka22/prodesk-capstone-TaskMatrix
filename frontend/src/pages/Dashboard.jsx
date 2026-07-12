import Navbar from "../components/Navbar";
import RecentTasks from "../components/RecentTasks";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import UpcomingDeadlines from "../components/UpcomingDeadlines";
import {
    MdFolder,
    MdTaskAlt,
    MdDoneAll,
    MdAccessTime,
} from "react-icons/md";


import "../styles/dashboard.css";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));

const hour = new Date().getHours();

let greeting = "Good Evening";

if (hour < 12) {
    greeting = "Good Morning";
} else if (hour < 17) {
    greeting = "Good Afternoon";
}

const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
});

    return (

        <div className="dashboard-container">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <div className="welcome-section">

                    <div className="hero-text">

    <h1>
        {greeting}, {user?.name?.split(" ")[0]} 👋
    </h1>

    <p className="hero-subtitle">
        Welcome back to TaskMatrix.
        Here's your workspace overview.
    </p>

    <span className="hero-date">
        {today}
    </span>

</div>

                    <button className="new-project">

                        + New Project

                    </button>

                </div>

                <div className="stats-grid">

    <StatsCard
        icon={<MdFolder />}
        title="Projects"
        value="12"
        trend="↑ 12% this week"
        trendColor="green"
    />

    <StatsCard
        icon={<MdTaskAlt />}
        title="Tasks"
        value="48"
        trend="18 active tasks"
        trendColor="blue"
    />

    <StatsCard
        icon={<MdDoneAll />}
        title="Completed"
        value="31"
        trend="↑ 8% this week"
        trendColor="green"
    />

    <StatsCard
        icon={<MdAccessTime />}
        title="Pending"
        value="17"
        trend="3 overdue tasks"
        trendColor="orange"
    />

</div>

                <div className="bottom-grid">

    <RecentTasks />

    <UpcomingDeadlines />

</div>

            </div>

        </div>

    );

}

export default Dashboard;