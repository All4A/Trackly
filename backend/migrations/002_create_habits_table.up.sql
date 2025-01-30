CREATE TABLE habits(
    id SERIAL PRIMARY KEY
    name TEXT NOT NULL
    description TEXT
);

CREATE TABLE user_habit
(
    id SERIAL PRIMARY KEY user_id INT,
    constraint u_id foreign key (user_id) references 001_create_users_table.up.sql (id)
        habit_id INT,
    constraint h_id foreign key (habit_id) references 002_create_habits_table.up.sql (id)
        description TEXT
        start_data DATE
        current_plan INT
);