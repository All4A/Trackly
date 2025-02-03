import React, { useState } from "react";
import "./styles/HobbyGrid.css";

export default function HobbyGrid({ hobbies }) {
  const [hobbiesState, setHobbiesState] = useState(hobbies);
  const [selectedHobby, setSelectedHobby] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [unit, setUnit] = useState("h"); // По умолчанию часы

  const unitOptions = {
    h: ["h", "min"], // для часов и минут
    km: ["km", "m"], // для километров и метров
    min: ["min"], // только минуты
    times: ["times"], // только разы
  };

  const openProgressForm = (hobby) => {
    setSelectedHobby(hobby);
    setInputValue("");
    setUnit(hobby.unit); // Устанавливаем единицу измерения хобби
  };

  const handleProgressSubmit = () => {
    if (!inputValue || isNaN(inputValue) || Number(inputValue) <= 0) return;

    let progress = Number(inputValue);
    if (unit === "min") {
      progress = progress / 60; // Преобразование минут в часы
    }
    if (unit === "m") {
      progress = progress / 1000; // Преобразование метров в километры
    }

    setHobbiesState((prevHobbies) =>
        prevHobbies.map((hobby) =>
            hobby.id === selectedHobby.id
                ? { ...hobby, todayTime: hobby.todayTime + progress }
                : hobby
        )
    );
    setSelectedHobby(null);
  };

  return (
      <div className="hobby-grid">
        {hobbiesState.map((hobby) => (
            <div
                key={hobby.id}
                className="hobby-card"
                onClick={() => openProgressForm(hobby)}
            >
              <div className="hobby-content">
                <div className="hobby-title">
                  <span>Hobby #{hobby.id}</span>
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
              <span>
                Today: {hobby.todayTime} {hobby.unit}
              </span>
                  <div className="progress-bar">
                    <div
                        className="progress"
                        style={{
                          width: `${(hobby.todayTime / hobby.dailyGoal) * 100}%`,
                        }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
        ))}

        {selectedHobby && (
            <div className="modal">
              <div className="modal-content">
                <h2>Add Progress for {selectedHobby.name}</h2>
                <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter progress"
                />
                <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                >
                  {unitOptions[selectedHobby.unit].map((option) => (
                      <option key={option} value={option}>
                        {option === "h"
                            ? "Hours"
                            : option === "min"
                                ? "Minutes"
                                : option === "km"
                                    ? "Kilometers"
                                    : option === "m"
                                        ? "Meters"
                                        : "Times"}
                      </option>
                  ))}
                </select>
                <button onClick={handleProgressSubmit}>Submit</button>
                <button onClick={() => setSelectedHobby(null)}>Cancel</button>
              </div>
            </div>
        )}
      </div>
  );
}
