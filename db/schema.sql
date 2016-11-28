DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS lists;
DROP TABLE IF EXISTS items;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name text,
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255)
);

CREATE TABLE lists (
  id SERIAL PRIMARY KEY,
  name text,
  user_id integer REFERENCES users (id)
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  table_id integer REFERENCES lists (id)
)
