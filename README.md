# Requirement

Using pg<br>
createdb pg-graphsql<br>
psql pg-graphsql<br>

## Table SQL

CREATE TABLE myuser (id SERIAL PRIMARY KEY, email TEXT, firstName TEXT,lastName TEXT );<br>
INSERT INTO myuser(email) VALUES ('toto@gmail.com');<br>
INSERT INTO myuser (firstName) VALUES ('Toto');<br>
INSERT INTO myuser " (lastName) VALUES ('Smith');<br>
\q<br>

CREATE TABLE model (id SERIAL PRIMARY KEY, author TEXT, comments TEXT,createdAt TEXT,updatedAt TEXT );<br>
INSERT INTO model (author) VALUES ('Toto');<br>
INSERT INTO model(comments) VALUES ('comments');<br>
INSERT INTO model (createdAt) VALUES ('26 octobre 2021');<br>
INSERT INTO model " (updatedAt) VALUES ('26 octobre 2021');<br>
\q<br>
<br>
