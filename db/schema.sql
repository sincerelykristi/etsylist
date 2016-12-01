DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS lists CASCADE;
DROP TABLE IF EXISTS items CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name text,
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255)
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name text,
  price text,
  image text,
  link text,
  table_id integer REFERENCES users (id)
)
