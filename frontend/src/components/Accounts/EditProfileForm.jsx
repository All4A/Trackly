import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import ApiClient from '../../api-client/src/ApiClient';
import UsersApi from '../../api-client/src/api/UsersApi';

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

  const [profilePicture, setProfilePicture] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);

  const jwtToken = JSON.parse(localStorage.getItem('jwt-token'));

  const apiClient = new ApiClient(process.env.REACT_APP_API_BASE_URL);
  const usersApi = new UsersApi(apiClient);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!profilePicture) {
      alert("Please select a profile picture.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('avatar', profilePicture);

    fetch(process.env.REACT_APP_API_BASE_URL + '/api/users/avatar', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + jwtToken,
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

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
      <Header />
      <nav className="nav-sidebar">
        {renderNavItems()}
      </nav>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-title">Edit Profile</div>
            <div className="profile-underline" />
            <div className="profile-tabs">
              <div className="tab">Preferences</div>
              <div className="tab">Security</div>
            </div>
            <div className="tabs-underline" />
          </div>
          <div className="profile-content">
            <div className="profile-picture-container">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="profile-picture" />
              ) : (
                <img
                  src="profile_edit.png"
                  alt="Default"
                  className="profile-picture"
                />
              )}
              <div className="upload-button-container">
                <label htmlFor="profile-picture-input" className="upload-button">
                  Upload Profile Picture
                </label>
                <input
                  id="profile-picture-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className="profile-details">
              <div className="input-group">
                <label>Name</label>
                <input type="text" defaultValue="Alexander Kim" />
              </div>
              <div className="input-group">
                <label>Username</label>
                <input type="text" defaultValue="lim0sha" />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input type="email" defaultValue="yourmail@gmail.com" />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" defaultValue="**********" />
              </div>
              <div className="input-group">
                <label>Date of Birth</label>
                <input type="text" defaultValue="12 September 2007" />
              </div>
              <div className="input-group">
                <label>Country</label>
                <input type="text" defaultValue="Russia" />
              </div>
              <div className="input-group">
                <label>City</label>
                <input type="text" defaultValue="Saint-Petersburg" />
              </div>
              <button type="submit" className="save-button">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProfileForm;