import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ApiClient from '../../api-client/src/ApiClient';
import UsersApi from '../../api-client/src/api/UsersApi';
import Header from "../Header";
import NavItem from "../NavItem";
import "./EditProfileForm.css";

const NAV_ITEMS = [
  { icon: "dashboard_inactive.png", label: "Dashboard", id: "dashboard", path: "/dashboard" },
  { icon: "accounts_active.png", label: "Accounts", id: "accounts", path: "/accounts" },
  { icon: "stats_inactive.png", label: "Statistics", id: "statistics", path: "/statistics" },
  { icon: "new_hobby_inactive.png", label: "New Hobby", id: "new", path: "/newhobby" },
  { icon: "log_out_inactive.png", label: "Log out", id: "logout", path: "/logout" }
];

function EditProfileForm() {
  const currentLocation = useLocation();
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [userProfileData, setUserProfileData] = useState({ username: "", email: "", dateOfBirth: "", country: "", city: "" });
  const jwtToken = JSON.parse(localStorage.getItem("jwt-token"));
  const apiClient = new ApiClient(process.env.REACT_APP_API_BASE_URL);
  const usersApi = new UsersApi(apiClient);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!jwtToken) {
      setError("JWT token is missing.");
      return;
    }

    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/profile`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${jwtToken}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch user profile.");
        return response.json();
      })
      .then((data) => {
        setUserProfileData({
          username: data.username,
          email: data.Email,
          dateOfBirth: data.dateOfBirth,
          country: data.Country,
          city: data.City,
          password: data.password,
        });
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setError(error.message || "An error occurred while fetching the user profile.");
      });

    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/avatar`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${jwtToken}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch profile picture.");
        return response.blob();
      })
      .then((blob) => setPreviewUrl(URL.createObjectURL(blob)))
      .catch((error) => {
        console.error("Error fetching profile picture:", error);
        setError(error.message || "An error occurred while fetching the profile picture.");
      });
  }, [jwtToken]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (profilePicture) {
      const formData = new FormData();
      formData.append("avatar", profilePicture);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/avatar`, {
          method: "POST",
          headers: { Authorization: `Bearer ${jwtToken}` },
          body: formData,
        });
        if (!response.ok) throw new Error("Failed to upload profile picture.");
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        setError(error.message || "An error occurred during avatar upload.");
        setLoading(false);
        return;
      }
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/profile`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${jwtToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(userProfileData),
      });
      if (!response.ok) throw new Error("Failed to update profile.");
      setSuccess(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message || "An error occurred during profile update.");
    } finally {
      setLoading(false);
    }
  };

  const renderNavItems = () =>
    NAV_ITEMS.map(({ icon, label, id, path }) => (
      <NavItem key={id} icon={icon} label={label} isActive={currentLocation.pathname === path} to={path} />
    ));

  return (
    <div className="accounts-container">
      <Header />
      <nav className="nav-sidebar">{renderNavItems()}</nav>
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
                <img src="profile_edit.png" alt="Default" className="profile-picture" />
              )}
              <div className="upload-button-container">
                <label htmlFor="profile-picture-input" className="upload-button">Upload Profile Picture</label>
                <input id="profile-picture-input" type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
              </div>
            </div>
            <div className="profile-details">
              <div className="input-group">
                <label>Name</label>
                <input type="text" value={userProfileData.name || ""} readOnly />
              </div>
              <div className="input-group">
                <label>Username</label>
                <input
                  type="text"
                  value={userProfileData.username || ""}
                  onChange={(e) => setUserProfileData({ ...userProfileData, username: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  value={userProfileData.email || ""}
                  onChange={(e) => setUserProfileData({ ...userProfileData, email: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" defaultValue="**********" readOnly />
              </div>
              <div className="input-group">
                <label>Date of Birth</label>
                <input
                  type="text"
                  value={userProfileData.dateOfBirth || ""}
                  onChange={(e) => setUserProfileData({ ...userProfileData, dateOfBirth: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Country</label>
                <input
                  type="text"
                  value={userProfileData.country || ""}
                  onChange={(e) => setUserProfileData({ ...userProfileData, country: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>City</label>
                <input
                  type="text"
                  value={userProfileData.city || ""}
                  onChange={(e) => setUserProfileData({ ...userProfileData, city: e.target.value })}
                />
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
