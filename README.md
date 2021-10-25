## Requirement

Using pg<br>
createdb pg-graphsql<br>
psql pg-graphsql<br>

# Using postgraphile GUI

npm install -g postgraphile <br>
postgraphile -c "postgres:///pg-graphsql" <br>
http://localhost:5000/graphiql<br>

See more at :
https://blog.logrocket.com/intro-to-postgres-graphql-with-postgraphile/

## Table SQL

Create table myuser (id_user SERIAL PRIMARY KEY,firstName TEXT,lastName TEXT,password TEXT,email TEXT);<br>

CREATE TABLE post (id_post SERIAL PRIMARY KEY,author INT references myuser(id_user), comments TEXT,content TEXT,createdAt TEXT,updatedAt TEXT );
\q<br>
<br>

## Kill port if address already in use :::4000

npx kill-port 4000 <br>
