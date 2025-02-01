import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import NavItem from "../NavItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch, faChartPie, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Legend, Title, Tooltip } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
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

const API_KEY = "83f09f65141e45b4bd5a3a0e1157ad85";
const NAV_ITEMS = [
  {
    icon: `https://cdn.builder.io/api/v1/image/assets/TEMP/52cc0491a8a854a6223c8f6f5eb25a394220233d9af9b146381e516021a4f12a?placeholderIfAbsent=true&apiKey=${API_KEY}`,
    label: "Dashboard",
    id: "dashboard",
    path: "/dashboard"
  },
  {
    icon: `https://cdn.builder.io/api/v1/image/assets/TEMP/15b5cfc67820989891b23b4a3710555588e81195c9ddeab528597b09ac566868?placeholderIfAbsent=true&apiKey=${API_KEY}`,
    label: "Accounts",
    id: "accounts",
    path: "/accounts",
  },
  {
    icon: `https://cdn.builder.io/api/v1/image/assets/TEMP/380cdb3e93aaef46827ba46ba7b8fe11fb670b7dc56c86e51b76801ccbf6329a?placeholderIfAbsent=true&apiKey=${API_KEY}`,
    label: "Statistics",
    id: "statistics",
    path: "/statistics",
  },
  {
    icon: `https://cdn.builder.io/api/v1/image/assets/TEMP/df1fb30faa992d3c769dff04787e1dae0d488fa050ac98dd3ea32c6eb922c904?placeholderIfAbsent=true&apiKey=${API_KEY}`,
    label: "New Hobby",
    id: "new",
    path: "/newhobby",
  },
  {
    icon: `https://cdn.builder.io/api/v1/image/assets/TEMP/cb3b5e46aa2a248a1a76117e406f510ecf7e2f23b6cf1d96b9a1d498186831bb?placeholderIfAbsent=true&apiKey=${API_KEY}`,
    label: "Log out",
    id: "logout",
    path: "/logout",
  },
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
    labels: ['Sat', 'Sun', 'Mon', 'Tue'],
    datasets: [
      {
        label: 'Planned',
        data: [45, 30, 50, 70],
        backgroundColor: 'rgba(0, 105, 148, 0.6)',
        borderColor: 'rgba(0, 105, 148, 1)',
        borderWidth: 1,
      },
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
