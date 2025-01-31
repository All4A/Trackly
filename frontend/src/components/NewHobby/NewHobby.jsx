import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";  // Импортируем useNavigate
import Header from "../Header";
import NavItem from "../NavItem";
import "./NewHobby.css";

const NAV_ITEMS = [
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/52cc0491a8a854a6223c8f6f5eb25a394220233d9af9b146381e516021a4f12a",
        label: "Dashboard",
        id: "dashboard"
    },
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/15b5cfc67820989891b23b4a3710555588e81195c9ddeab528597b09ac566868?placeholderIfAbsent=true&apiKey=83f09f65141e45b4bd5a3a0e1157ad85",
        label: "Accounts",
        id: "accounts"
    },
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d82d5239f0295efda0c2f5bd78e367a38f93516f37c11c855ee48db382a4ad19",
        label: "Statistics",
        id: "statistics"
    },
    {
        icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/33b7847917cb77fbfa74f853723d8686629940a0455e9a195b826fe74f7ab6c3?placeholderIfAbsent=true&apiKey=83f09f65141e45b4bd5a3a0e1157ad85',
        label: 'New Hobby',
        id: 'new',
    },
    {
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/cb3b5e46aa2a248a1a76117e406f510ecf7e2f23b6cf1d96b9a1d498186831bb",
        label: "Log out",
        id: "logout"
    }
];

function NewHobby() {
    const [activeNav, setActiveNav] = useState("new");
    const [notifications, setNotifications] = useState(false);
    const navigate = useNavigate();  // Инициализируем useNavigate

    // Обработчик для кнопки "Log out"
    const handleLogout = () => {
        // Очистка данных, если необходимо (например, токены)
        // localStorage.removeItem('authToken');

        // Переход на страницу входа
        navigate('/');
    };

    return (
        <div className="hobby-container">
            <Header />
            <nav className="nav-sidebar">
                {NAV_ITEMS.map(({ icon, label, id }) => (
                    <NavItem
                        key={id}
                        icon={icon}
                        label={label}
                        isActive={activeNav === id}
                        onClick={() => id === "logout" ? handleLogout() : setActiveNav(id)} // Добавляем проверку для "Log out"
                    />
                ))}
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
