import React from "react";
import "./styles/HobbyGrid.css";

export default function HobbyGrid({ hobbies }) {
  return (
    <div className="hobby-grid">
      {hobbies.map((hobby) => (
        <div key={hobby.id} className="hobby-card">
          <div className="hobby-content">
            <div className="hobby-title">
              <span>Hobbie #{hobby.id}</span>
              <h2>{hobby.name}</h2>
            </div>
            <div className="hobby-details">
              <div>
                <span>Doing since</span>
                <p>{hobby.startDate}</p>
              </div>
              <div>
                <span>Current plan</span>
                <p>{hobby.currentPlan}</p>
              </div>
            </div>
            <div className="hobby-progress">
              <span>Today: {hobby.todayTime} h</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${(hobby.todayTime / hobby.dailyGoal) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}