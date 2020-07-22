DROP DATABASE IF EXISTS noteTaker_db;
CREATE DATABASE noteTaker_db;

-- tells mysql that we are going to start interacting with library_db
USE noteTaker_db;

CREATE TABLE notes (
  title VARCHAR(255) NOT NULL,
  text VARCHAR(255) NOT NULL,
  id INT AUTO_INCREMENT,
  PRIMARY KEY (id)
);
