import React from "react";
import {useLocation} from "react-router-dom";
import Header from "../Header";
import NavItem from "../NavItem";
import HobbyGrid from "./HobbyGrid";
import "./styles/Dashboard.css";

const jwtToken = JSON.parse(localStorage.getItem('jwt-token'));

const NAV_ITEMS = [
    {
        icon: "dashboard_active.png",
        label: "Dashboard",
        id: "dashboard",
        path: "/dashboard",
    },
    {
        icon: "accounts_inactive.png",
        label: "Accounts",
        id: "accounts",
        path: "/accounts",
    },
    {
        icon: "stats_inactive.png",
        label: "Statistics",
        id: "statistics",
        path: "/statistics",
    },
    {
        icon: "new_hobby_inactive.png",
        label: "New Hobby",
        id: "new",
        path: "/newhobby",
    },
    {
        icon: "log_out_inactive.png",
        label: "Log out",
        id: "logout",
        path: "/logout"
    }
];

const hobbies = [
    {
        id: 1,
        name: "Football",
        startDate: "29/01/2024",
        currentPlan: "2 times/week",
        todayTime: 2,
        unit: "times",
        dailyGoal: 3
    },
    {
        id: 2,
        name: "Tennis",
        startDate: "29/01/2024",
        currentPlan: "5 hours/day",
        todayTime: 2,
        unit: "h",
        dailyGoal: 5
    },
    {
        id: 3,
        name: "Running",
        startDate: "29/01/2024",
        currentPlan: "7 km/day",
        todayTime: 1,
        unit: "km",
        dailyGoal: 7
    },
];

export default function Dashboard() {
    const currentLocation = useLocation();

    return (
        <div className="dashboard-container">
            <Header/>
            <nav className="nav-sidebar">
                {NAV_ITEMS.map(({icon, label, id, path}) => (
                    <NavItem
                        key={id}
                        icon={icon}
                        label={label}
                        isActive={currentLocation.pathname === path}
                        to={path}
                    />
                ))}
            </nav>
            <main className="main-content">
                <div className="profile-section">
                    <section>
                        <div className="hobby-section-header">
                            <h2 className="text-2xl font-semibold text-slate-700">My Hobbies</h2>
                            <button className="button-secondary">See All</button>
                        </div>
                        <HobbyGrid hobbies={hobbies || []}/>
                    </section>
                </div>
            </main>
        </div>
    );
}
