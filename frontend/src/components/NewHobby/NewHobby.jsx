import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import NavItem from "../NavItem";
import "./NewHobby.css";

const NAV_ITEMS = [
    {
        icon: "dashboard_inactive.png",
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
        icon: "new_hobby_active.png",
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

function NewHobby() {
    const currentLocation = useLocation();
    const [notifications, setNotifications] = useState(false);

    const renderNavItems = () =>
        NAV_ITEMS.map(({ icon, label, id, path }) => (
          <NavItem
            key={id}
            icon={icon}
            label={label}
            isActive={currentLocation.pathname === path}
            to={path}
          />
        ));

    return (
        <div className="hobby-container">
            <Header />
            <nav className="nav-sidebar">
                {renderNavItems()}
            </nav>
            <form className="new-hobby-form">
                <div className="form-container">
                    <h2 className="form-title">Create a New Hobby</h2>
                    <label>Hobby Name</label>
                    <input type="text" placeholder="What is your new interest?" />

                    <label>Hobby Schedule</label>
                    <div className="schedule-group">
                        <input type="number" defaultValue="1" />
                        <select>
                            <option>times</option>
                            <option>seconds</option>
                            <option>minutes</option>
                            <option>hours</option>
                            <option>days</option>
                        </select>
                        <span>per</span>
                        <input type="number" defaultValue="2" />
                        <select>
                            <option>days</option>
                            <option>weeks</option>
                            <option>months</option>
                            <option>seasons</option>
                            <option>years</option>
                        </select>
                    </div>

                    <label>Description</label>
                    <textarea placeholder="Describe your hobby..." />

                    <label className="switch-label">
                        I want to receive notifications
                        <div className="container">
                            <input
                                type="checkbox"
                                className="checkbox"
                                id="checkbox"
                                checked={notifications}
                                onChange={() => setNotifications(!notifications)}
                            />
                            <label className="switch" htmlFor="checkbox">
                                <span className="slider"></span>
                            </label>
                        </div>
                    </label>

                    <button type="submit" className="save-button">Save</button>
                </div>
            </form>
        </div>
    );
}

export default NewHobby;
