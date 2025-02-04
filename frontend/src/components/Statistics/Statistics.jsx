import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import ApiClient from '../../api-client/src/ApiClient';
import HobbiesApi from '../../api-client/src/api/HobbiesApi';

import Header from "../Header";
import NavItem from "../NavItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch, faChartPie, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Legend, Title, Tooltip } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import HobbyDropdown from "../Statistics/HobbyDropdown";
import "./Statistics.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Legend,
    Title,
    Tooltip
);

const jwtToken = JSON.parse(localStorage.getItem('jwt-token'));

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
      icon: "stats_active.png",
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

const StatisticItem = ({ icon, label, value, unit }) => (
    <div className="statistic-item">
      <div className="icon-container">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="statistic-content">
        <p>{label}</p>
        <h3>
          {value} {unit}
        </h3>
      </div>
    </div>
);

const WeeklyActivityChart = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Activity',
        data: [90, 60, 60, 90],
        backgroundColor: 'rgba(255, 102, 0, 0.6)',
        borderColor: 'rgba(255, 102, 0, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 100,
            stepSize: 20,
            callback: (value) => `${value}%`,
          },
        },
      ],
    },
    legend: {
      position: 'top',
    },
  };

  return <Bar data={data} options={options} />;
};

const MonthlyHistoryChart = () => {
  const data = {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    datasets: [
      {
        label: 'Activity',
        data: [20, 40, 50, 90, 70, 30, 75],
        fill: true,
        backgroundColor: 'rgba(0, 105, 148, 0.2)',
        borderColor: 'rgba(0, 105, 148, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 100,
            stepSize: 25,
            callback: (value) => `${value}%`,
          },
        },
      ],
    },
    legend: {
      position: 'top',
    },
  };

  return <Line data={data} options={options} />;
};

export default function Statistics() {
  const currentLocation = useLocation();
  const [selectedHobby, setSelectedHobby] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const personalStatistics = [
    {
      icon: faStopwatch,
      label: "Total time spent",
      value: 429,
      unit: "h",
    },
    {
      icon: faChartPie,
      label: "Average hobby time",
      value: 1.3,
      unit: "h / day",
    },
    {
      icon: faArrowUp,
      label: "Intensity gain",
      value: "+5.80",
      unit: "%",
    },
  ];

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
    <div className="statistics-container">
      <Header />
      <nav className="nav-sidebar">
        {renderNavItems()}
      </nav>
      <div className="flex-container">
        <main className="main-content">
          <div>
            <h2>Personal Statistics</h2>
            {loading ? (
              <p>Loading hobbies...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <HobbyDropdown
                hobbies={hobbies.map(item => item.name)}
                onSelect={setSelectedHobby}
              />
            )}
            <div className="personal-statistics">
              {personalStatistics.map((stat) => (
                  <StatisticItem
                      key={stat.label}
                      icon={stat.icon}
                      label={stat.label}
                      value={stat.value}
                      unit={stat.unit}
                  />
              ))}
            </div>
            <div className="flex-container">
              <div className="weekly-activity">
                <h2>Weekly Activity</h2>
                <WeeklyActivityChart />
              </div>
              <div className="monthly-history">
                <h2 className="content-header">Monthly History</h2>
                <MonthlyHistoryChart />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}