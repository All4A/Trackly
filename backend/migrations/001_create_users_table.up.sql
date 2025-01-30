CREATE TABLE users
(
    id       SERIAL PRIMARY KEY,
    password TEXT        NOT NULL,
    username TEXT UNIQUE NOT NULL
);

