import React, { useState, useEffect } from "react";

import ApiClient from '../../api-client/src/ApiClient';
import HobbiesScoreApi from '../../api-client/src/api/HobbiesScoreApi';

import "./styles/HobbyGrid.css";

export default function HobbyGrid({ hobbies }) {
  const [hobbiesState, setHobbiesState] = useState(hobbies);
  const [selectedHobby, setSelectedHobby] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [unit, setUnit] = useState("km");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiClient = new ApiClient(process.env.REACT_APP_API_BASE_URL);
  const hobbyScoreApi = new HobbiesScoreApi(apiClient);

  const jwtToken = JSON.parse(localStorage.getItem('jwt-token'));

  useEffect(() => {
    setHobbiesState(hobbies);
  }, [hobbies]);

  const unitOptions = {
    distance: ["km"],
    time: ["min"],
    count: ["times"],
  };

  const openProgressForm = (hobby) => {
    setSelectedHobby(hobby);
    setInputValue("");
    const defaultUnit =
      hobby.currentPlan.planUnit === "distance"
        ? "km"
        : hobby.currentPlan.planUnit === "time"
        ? "min"
        : "times";
    setUnit(defaultUnit);
  };

  const handleProgressSubmit = () => {
    if (!inputValue || isNaN(inputValue) || Number(inputValue) <= 0) return;

    let progress = Number(inputValue);

    const updatedHobbies = hobbiesState.map((hobby) => {
      if (hobby.id === selectedHobby.id) {
        const updatedHobby = {
          ...hobby,
          todayValue: hobby.todayValue + progress,
        };

        hobbyScoreApi.apiHabitsHabitIdScorePost(
          jwtToken,
          updatedHobby.id,
          {
            date: new Date(),
            value: updatedHobby.todayValue,
          },
          (error, data, response) => {
            setLoading(false);
            if (error) {
              setError(error || "An error occurred during uploading hobby update.");
            } else {
              console.log("Hobby updated successfully.");
            }
          }
        );

        return updatedHobby;
      }
      return hobby;
    });

    setHobbiesState(updatedHobbies);
    setSelectedHobby(null);
  };

  return (
    <div className="hobby-grid">
      {hobbiesState.map((hobby) => {
        const { id, name, startDate, currentPlan, todayValue } = hobby;
        const { goal, planUnit } = currentPlan;

        const displayUnit =
          planUnit === "distance"
            ? "km"
            : planUnit === "time"
            ? "min"
            : planUnit === "count"
            ? "times"
            : "";
            
        return (
          <div
            key={id}
            className="hobby-card"
            onClick={() => openProgressForm(hobby)}
          >
            <div className="hobby-content">
              <div className="hobby-title">
                <span>Hobby #{id}</span>
                <h2>{name}</h2>
              </div>
              <div className="hobby-details">
                <div>
                  <span>Doing since</span>
                  <p>{startDate.toDateString()}</p>
                </div>
                <div>
                  <span>Current plan</span>
                  <p>
                    {goal} {displayUnit}
                  </p>
                </div>
              </div>
              <div className="hobby-progress">
                <span>
                  Today: {todayValue.toFixed(2)} {displayUnit}
                </span>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{
                      width: `${(todayValue / goal) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
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
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
              {unitOptions[selectedHobby.currentPlan.planUnit]?.map((option) => (
                <option key={option} value={option}>
                  {option === "min" ? "Minutes" : option === "km" ? "Kilometers" : "Times"}
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
