import * as React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import NavItem from "../NavItem";
import "./EditProfileForm.css";

const NAV_ITEMS = [
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/52cc0491a8a854a6223c8f6f5eb25a394220233d9af9b146381e516021a4f12a?apiKey=83f09f65141e45b4bd5a3a0e1157ad85",
        label: "Dashboard",
        id: "dashboard",
        path: "/dashboard",
    },
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9c894df00af0b9778a02cbc832f65f88a1bae54febe89c8e3c49674aa0ebbd36?apiKey=83f09f65141e45b4bd5a3a0e1157ad85",
        label: "Accounts",
        id: "accounts",
        path: "/accounts",
    },
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d82d5239f0295efda0c2f5bd78e367a38f93516f37c11c855ee48db382a4ad19?apiKey=83f09f65141e45b4bd5a3a0e1157ad85",
        label: "Statistics",
        id: "statistics",
        path: "/statistics",
    },
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/df1fb30faa992d3c769dff04787e1dae0d488fa050ac98dd3ea32c6eb922c904?apiKey=83f09f65141e45b4bd5a3a0e1157ad85",
        label: "New Hobby",
        id: "new",
        path: "/newhobby",
    },
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/cb3b5e46aa2a248a1a76117e406f510ecf7e2f23b6cf1d96b9a1d498186831bb?apiKey=83f09f65141e45b4bd5a3a0e1157ad85",
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
