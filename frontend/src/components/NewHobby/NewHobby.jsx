import { useState } from "react";
import { useLocation } from "react-router-dom";

import ApiClient from '../../api-client/src/ApiClient';
import HobbiesApi from '../../api-client/src/api/HobbiesApi';
import NewHabit from '../../api-client/src/model/NewHabit';
import Plan from '../../api-client/src/model/Plan';
import PlanUnit from '../../api-client/src/model/PlanUnit';

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
  const jwtToken = JSON.parse(localStorage.getItem('jwt-token'));
  const currentLocation = useLocation();

  const planUnit = new PlanUnit();
  const plan = new Plan();
  plan.goal = 1;
  plan.planUnit = planUnit.time;
  const [formData, setFormData] = useState({
    ...new NewHabit('', plan),
    notifications: false,
  });
  
  const apiClient = new ApiClient(process.env.REACT_APP_API_BASE_URL);
  const hobbyApi = new HobbiesApi(apiClient);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    hobbyApi.apiHabitsPost(
      formData, jwtToken, (error, data, response) => {
      setLoading(false);
      if (error) {
        setError(error || 'An error occurred during uploading the hobby.');
      } else {
        setSuccess(true);
        console.log('Hobby upload successful:', data);
      }
    }
    );
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
  
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (name === 'planUnit') {
      setFormData((prevData) => ({
        ...prevData,
        plan: {
          ...prevData.plan,
          planUnit: value,
        },
      }));
    } else if (name === 'goal') {
      setFormData((prevData) => ({
        ...prevData,
        plan: {
          ...prevData.plan,
          goal: parseInt(value, 10),
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
    <div className="hobby-container">
      <Header />
      <nav className="nav-sidebar">
        {renderNavItems()}
      </nav>
      <form className="new-hobby-form" onSubmit={handleSubmit}>
        <div className="form-container">
          <h2 className="form-title">Create a New Hobby</h2>
          <label>Hobby Name</label>
          <input
            name='name'
            value={formData.name}
            type="text"
            placeholder="What is your new interest?"
            className="input-field"
            onChange={handleChange}
          />

          <label>Hobby Schedule</label>
          <div className="schedule-group">
            <input
              type="number"
              defaultValue="1"
              className="input-field"
              name="goal"
              value={formData.plan.goal}
              onChange={handleChange}
            />
            <select
              name="planUnit"
              value={formData.plan.planUnit}
              onChange={handleChange}
            >
              <option value={planUnit.time}>minutes per day</option>
              <option value={planUnit.distance}>km per day</option>
              <option value={planUnit.count}>times per day</option>
            </select>
          </div>

          <label>Description</label>
          <textarea
            placeholder="Describe your hobby..."
            name='description'
            value={formData.description}
            type="text"
            onChange={handleChange}
          />

          <label className="switch-label">
            I want to receive notifications
            <div className="container">
              <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
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
