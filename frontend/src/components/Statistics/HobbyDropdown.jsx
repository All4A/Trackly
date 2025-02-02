import React, { useState } from "react";

// Dropdown component for selecting hobbies
const HobbyDropdown = ({ hobbies, onSelect }) => {
    const [selectedHobby, setSelectedHobby] = useState(hobbies[0]);

    const handleChange = (event) => {
        setSelectedHobby(event.target.value);
        onSelect(event.target.value);
    };

    return (
        <div className="dropdown-container">
            <label htmlFor="hobby-select">Select Hobby:</label>
            <select id="hobby-select" value={selectedHobby} onChange={handleChange}>
                {hobbies.map((hobby) => (
                    <option key={hobby} value={hobby}>
                        {hobby}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default HobbyDropdown;