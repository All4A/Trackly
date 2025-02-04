CREATE TABLE plans
(
    id       SERIAL PRIMARY KEY,
    habit_id INT,
    plan_unit TEXT,
    goal INT,
    start_time DATE,
    close_time DATE
);
CREATE TABLE habits
(
    id SERIAL PRIMARY KEY,
    habit_name TEXT NOT NULL,
    description TEXT,
    user_id int,
    constraint us_id foreign key (user_id) references users(id),
    start_date DATE,
    notifications BOOLEAN

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

ALTER TABLE plans
    ADD CONSTRAINT fk_plans_habit_id
        FOREIGN KEY (habit_id)
            REFERENCES habits(id);

CREATE TABLE habit_scores(
    id SERIAL PRIMARY KEY ,
    habit_id int,
    constraint hab_id foreign key (habit_id) references habits(id),
    plan_id int,
    constraint pl_id foreign key (plan_id) references plans(id),
    date_time DATE,
    value int
);