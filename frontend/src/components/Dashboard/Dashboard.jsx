import { useLocation } from "react-router-dom";
import Header from "../Header";
import NavItem from "../NavItem";
import HobbyGrid from "./HobbyGrid";
import "./styles/Dashboard.css";

const NAV_ITEMS = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/cb23cfa1c40355add1d0253d24b1bdc4dc8b5e8d0307e00f856279f2f21800a4?placeholderIfAbsent=true&apiKey=83f09f65141e45b4bd5a3a0e1157ad85",
    label: "Dashboard",
    id: "dashboard",
    path: "/dashboard",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/15b5cfc67820989891b23b4a3710555588e81195c9ddeab528597b09ac566868?placeholderIfAbsent=true&apiKey=83f09f65141e45b4bd5a3a0e1157ad85",
    label: "Accounts",
    id: "accounts",
    path: "/accounts",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d82d5239f0295efda0c2f5bd78e367a38f93516f37c11c855ee48db382a4ad19?placeholderIfAbsent=true&apiKey=83f09f65141e45b4bd5a3a0e1157ad85",
    label: "Statistics",
    id: "statistics",
    path: "/statistics",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/df1fb30faa992d3c769dff04787e1dae0d488fa050ac98dd3ea32c6eb922c904?placeholderIfAbsent=true&apiKey=83f09f65141e45b4bd5a3a0e1157ad85",
    label: "New hobbie",
    id: "new",
    path: "/new",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/cb3b5e46aa2a248a1a76117e406f510ecf7e2f23b6cf1d96b9a1d498186831bb?placeholderIfAbsent=true&apiKey=83f09f65141e45b4bd5a3a0e1157ad85",
    label: "Log out",
    id: "logout",
    path: "/logout",
  }
];

const hobbies = [
  {
    id: 1,
    name: "Football",
    startDate: "29/01/2024",
    currentPlan: "2 times/week",
    todayTime: 2,
    dailyGoal: 3
  },
  {
    id: 2,
    name: "Tennis",
    startDate: "29/01/2024",
    currentPlan: "5 hours/day",
    todayTime: 2,
    dailyGoal: 5
  },
];

export default function Dashboard() {
  const currentLocation = useLocation();

  return (
    <div className="dashboard-container">
      <Header />
      <nav className="nav-sidebar">
        {NAV_ITEMS.map(({ icon, label, id, path }) => (
          <NavItem
            key={id}
            icon={icon}
            label={label}
            isActive={currentLocation.pathname === path}
            to={path}
          />
        ))}
      </nav>
      <main className="main-content">
        <div className="profile-section">
          <section>
            <div className="hobby-section-header">
              <h2 className="text-2xl font-semibold text-slate-700">My Hobbies</h2>
              <button className="button-secondary">See All</button>
            </div>
            <HobbyGrid hobbies={hobbies} />
          </section>
        </div>
      </main>
    </div>
  );
}