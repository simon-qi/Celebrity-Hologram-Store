CREATE TABLE celebrity (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  age INTEGER,
  occupation VARCHAR(50),
  price MONEY
);

CREATE TYPE PRIVILEGE AS ENUM('READ', 'READWRITE', 'SUPERUSER');

CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL,
  privilege PRIVILEGE NOT NULL
);

INSERT INTO account(username, password, privilege) VALUES
('ABC', 'test', 'READ'),
('XYZ', 'test', 'READWRITE');
