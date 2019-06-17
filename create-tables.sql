CREATE TABLE celebrity (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  age INTEGER NOT NULL,
  occupation VARCHAR(50) NOT NULL,
  price MONEY NOT NULL
);

CREATE TYPE PRIVILEGE AS ENUM('READ', 'READWRITE', 'SUPERUSER');

CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL,
  privilege PRIVILEGE NOT NULL
);

INSERT INTO account(username, password, privilege) VALUES
('admin', 'test', 'SUPERUSER'),
('ABC', 'test', 'READ'),
('XYZ', 'test', 'READWRITE');
