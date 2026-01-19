DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  balance INT NOT NULL CHECK (balance >= 0)
);

INSERT INTO accounts (name, balance)
VALUES
('Alice', 1000),
('Bob', 500),
('Charlie', 700);
