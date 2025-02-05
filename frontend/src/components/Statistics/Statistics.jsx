import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ApiClient from '../../api-client/src/ApiClient';
import HobbiesApi from '../../api-client/src/api/HobbiesApi';
import Header from "../Header";
import NavItem from "../NavItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch, faChartPie, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Legend, Tooltip } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import HobbyDropdown from "../Statistics/HobbyDropdown";
import "./Statistics.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Legend, Tooltip);

const NAV_ITEMS = [
  { icon: "dashboard_inactive.png", label: "Dashboard", id: "dashboard", path: "/dashboard" },
  { icon: "accounts_inactive.png", label: "Accounts", id: "accounts", path: "/accounts" },
  { icon: "stats_active.png", label: "Statistics", id: "statistics", path: "/statistics" },
  { icon: "new_hobby_inactive.png", label: "New Hobby", id: "new", path: "/newhobby" },
  { icon: "log_out_inactive.png", label: "Log out", id: "logout", path: "/logout" }
];

const StatisticItem = ({ icon, label, value, unit }) => (
  <div className="statistic-item">
    <div className="icon-container"><FontAwesomeIcon icon={icon} /></div>
    <div className="statistic-content">
      <p>{label}</p>
      <h3>{value} {unit}</h3>
    </div>
  </div>
);

export default function Statistics() {
  const currentLocation = useLocation();
  const [selectedHobby, setSelectedHobby] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalStats, setTotalStats] = useState({});
  const jwtToken = JSON.parse(localStorage.getItem('jwt-token'));

  const apiClient = new ApiClient(process.env.REACT_APP_API_BASE_URL);
  const hobbyApi = new HobbiesApi(apiClient);

  useEffect(() => {
    setLoading(true);
    hobbyApi.apiHabitsGet(jwtToken, (error, data) => {
      setLoading(false);
      if (error) setError(error || 'An error occurred during downloading user hobbies.');
      else setHobbies(data);
    });
  }, [jwtToken]);

  useEffect(() => {
    if (selectedHobby && selectedHobby !== "none") {
      const habitId = hobbies.find(hobby => hobby.name === selectedHobby)?.id;
      if (habitId) {
        const today = new Date();
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);
        const formatDate = (date) => date.toISOString().split('T')[0];
        fetchHabitStatistics(habitId, formatDate(oneWeekAgo), formatDate(today), "day")
          .then(data => {
            if (data.groupBy === "day") {
              setWeeklyData(data.period);
            } else if (data.groupBy === "month") {
              setMonthlyData(data.period);
            }
          })
          .catch(err => {
            console.error("Error fetching statistics:", err);
            setError("Failed to fetch statistics. Please check your internet connection or try again later.");
          });

        fetchTotalHobbyStatistics(habitId)
          .then(data => setTotalStats(data))
          .catch(err => {
            console.error("Error fetching total statistics:", err);
            setError("Failed to fetch total statistics. Please check your internet connection or try again later.");
          });
      } else {
        setWeeklyData([]);
        setMonthlyData([]);
        setTotalStats({});
      }
    }
  }, [selectedHobby, hobbies]);

  const fetchHabitStatistics = async (habitId, dateFrom, dateTo, groupBy) => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/habits/${habitId}/statistic`;
    const params = new URLSearchParams({
      'date-from': dateFrom,
      'date-to': dateTo,
      'group-by': groupBy,
    });

    try {
      const response = await fetch(`${url}?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching habit statistics:', error);
      throw error;
    }
  };

  const fetchTotalHobbyStatistics = async (habitId) => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/habits/${habitId}/statistic/total`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching total habit statistics:', error);
      throw error;
    }
  };

  const renderNavItems = () =>
    NAV_ITEMS.map(({ icon, label, id, path }) => (
      <NavItem key={id} icon={icon} label={label} isActive={currentLocation.pathname === path} to={path} />
    ));

  const WeeklyActivityChart = () => {
    const data = {
      labels: weeklyData.map(item => item.interval),
      datasets: [{
        label: 'Activity',
        data: weeklyData.map(item => item.value),
        backgroundColor: 'rgba(255, 102, 0, 0.6)',
        borderColor: 'rgba(255, 102, 0, 1)',
        borderWidth: 1,
      }],
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: { callback: (value) => `${value}%` },
        },
      },
      plugins: { legend: { position: 'top' } },
    };
    return <Bar data={data} options={options} />;
  };

  const MonthlyHistoryChart = () => {
    const data = {
      labels: monthlyData.map(item => item.interval),
      datasets: [{
        label: 'Activity',
        data: monthlyData.map(item => item.value),
        fill: true,
        backgroundColor: 'rgba(0, 105, 148, 0.2)',
        borderColor: 'rgba(0, 105, 148, 1)',
        borderWidth: 1,
      }],
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: { callback: (value) => `${value}%` },
        },
      },
      plugins: { legend: { position: 'top' } },
    };
    return <Line data={data} options={options} />;
  };

  const personalStatistics = [
    { icon: faStopwatch, label: "Total time spent", value: (totalStats.total / 60).toFixed(1) || 0, unit: "h" },
    { icon: faChartPie, label: "Average hobby time", value: (totalStats.averagePerDay / 60).toFixed(1) || 0, unit: "h / day" },
    { icon: faArrowUp, label: "Intensity gain", value: "+5.80", unit: "%" }
  ];

  return (
    <div className="statistics-container">
      <Header />
      <nav className="nav-sidebar">{renderNavItems()}</nav>
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
                hobbies={['none'].concat(hobbies.map(item => item.name))}
                onSelect={setSelectedHobby}
              />
            )}
            <div className="personal-statistics">
              {personalStatistics.map((stat) => (
                <StatisticItem key={stat.label} icon={stat.icon} label={stat.label} value={stat.value} unit={stat.unit} />
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