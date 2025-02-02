import * as React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import NavItem from "../NavItem";
import "./EditProfileForm.css";

const NAV_ITEMS = [
    {
        icon: "dashboard_inactive.png",
        label: "Dashboard",
        id: "dashboard",
        path: "/dashboard",
    },
    {
        icon: "accounts_active.png",
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

function EditProfileForm() {
    const currentLocation = useLocation();

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
        <div className="accounts-container">
            <Header/>
            <nav className="nav-sidebar">
                {renderNavItems()}
            </nav>
            <form className="edit-profile-form">
                <div className="profile-container">
                    <div className="profile-header">
                        <div className="profile-title">Edit Profile</div>
                        <div className="profile-underline"/>
                        <div className="profile-tabs">
                            <div className="tab">Preferences</div>
                            <div className="tab">Security</div>
                        </div>
                        <div className="tabs-underline"/>
                    </div>
                    <div className="profile-content">
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce0d48665b10e1164b1b12fb4c0cc8a2465298dce88b7c0bda3dc3cc7f7458e7?apiKey=83f09f65141e45b4bd5a3a0e1157ad85"
                            alt="" className="profile-picture"/>
                        <div className="profile-details">
                            <div className="input-group">
                                <label>Name</label>
                                <input type="text" defaultValue="Alexander Kim"/>
                            </div>
                            <div className="input-group">
                                <label>Username</label>
                                <input type="text" defaultValue="lim0sha"/>
                            </div>
                            <div className="input-group">
                                <label>Email</label>
                                <input type="email" defaultValue="yourmail@gmail.com"/>
                            </div>
                            <div className="input-group">
                                <label>Password</label>
                                <input type="password" defaultValue="**********"/>
                            </div>
                            <div className="input-group">
                                <label>Date of Birth</label>
                                <input type="text" defaultValue="12 September 2007"/>
                            </div>
                            <div className="input-group">
                                <label>Country</label>
                                <input type="text" defaultValue="Russia"/>
                            </div>
                            <div className="input-group">
                                <label>City</label>
                                <input type="text" defaultValue="Saint-Petersburg"/>
                            </div>
                            <button type="submit" className="save-button">Save</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditProfileForm;
