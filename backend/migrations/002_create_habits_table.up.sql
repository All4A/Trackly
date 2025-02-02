CREATE TABLE habits
(
    id SERIAL PRIMARY KEY,
    habit_name TEXT NOT NULL,
    description TEXT
);
CREATE TABLE user_habits
(
    id SERIAL PRIMARY KEY,
    user_id INT,
    constraint u_id foreign key (user_id) references users (id),
    habit_id INT,
    constraint h_id foreign key (habit_id) references habits (id),
    start_date DATE,
    current_plan INT
);