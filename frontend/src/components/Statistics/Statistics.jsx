import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header";
import NavItem from "../NavItem";
import "./Statistics.css";

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
    path: "/new",
  },
  {
    icon: `https://cdn.builder.io/api/v1/image/assets/TEMP/cb3b5e46aa2a248a1a76117e406f510ecf7e2f23b6cf1d96b9a1d498186831bb?placeholderIfAbsent=true&apiKey=${API_KEY}`,
    label: "Log out",
    id: "logout",
    path: "/logout",
  },
];

export default function Statistics() {
  const currentLocation = useLocation();
  const [activeNav, setActiveNav] = useState("statistics");
  const navigate = useNavigate(); // Инициализируем useNavigate

  // Обработчик для кнопки "Log out"
  const handleLogout = () => {
    // Очистка данных, если необходимо (например, токены)
    // localStorage.removeItem('authToken');

    // Переход на страницу входа
    navigate('/');
  };

  const renderNavItems = () =>
    NAV_ITEMS.map(({ icon, label, id, path }) => (
      <NavItem
        key={id}
        icon={icon}
        label={label}
        isActive={currentLocation.pathname === path}
        to={path}
        onClick={() => id === "logout" ? handleLogout() : setActiveNav(id)} // Проверка для выхода
      />
    ));

  return (
      <div className="statistics-container">
        <Header />
        <renderNavItems />
      </div>
  );
}
