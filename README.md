# Requirement
Using pg
createdb pg-graphsql
psql pg-graphsql

## Table SQL
CREATE TABLE myuser (id SERIAL PRIMARY KEY, email TEXT, firstName TEXT,lastName TEXT );
INSERT INTO myuser(email) VALUES ('toto@gmail.com');
INSERT INTO myuser (firstName) VALUES ('Toto');
INSERT INTO myuser " (lastName) VALUES ('Smith');
\q

CREATE TABLE model (id SERIAL PRIMARY KEY, author TEXT, comments TEXT,createdAt TEXT,updatedAt TEXT  );
INSERT INTO model (author) VALUES ('Toto');
INSERT INTO model(comments) VALUES ('comments');
INSERT INTO model (createdAt) VALUES ('26 octobre 2021');
INSERT INTO model " (updatedAt) VALUES ('26 octobre 2021');
\q
