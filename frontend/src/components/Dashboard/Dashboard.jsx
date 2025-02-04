import React, { useState, useEffect } from "react";
import {useLocation} from "react-router-dom";

import ApiClient from '../../api-client/src/ApiClient';
import HobbiesApi from '../../api-client/src/api/HobbiesApi';

import Header from "../Header";
import NavItem from "../NavItem";
import HobbyGrid from "./HobbyGrid";
import "./styles/Dashboard.css";

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

export default function Dashboard() {
    const currentLocation = useLocation();

    const [hobbies, setHobbies] = useState([]);
    const jwtToken = JSON.parse(localStorage.getItem('jwt-token'));

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiClient = new ApiClient(process.env.REACT_APP_API_BASE_URL);
    const hobbyApi = new HobbiesApi(apiClient);

    useEffect(() => {
        setLoading(true);
        hobbyApi.apiHabitsGet(jwtToken, (error, data, response) => {
          setLoading(false);
          if (error) {
            setError(error || 'An error occurred during downloading user hobbies.');
          } else {
            setHobbies(data);
          }
        });
    }, [jwtToken]);

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
                        <HobbyGrid hobbies={hobbies}/>
                    </section>
                </div>
            </main>
        </div>
    );
}
