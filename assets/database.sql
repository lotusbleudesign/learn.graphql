Create table myuser (
  id_user SERIAL PRIMARY KEY,
  firstName TEXT,
  lastName TEXT,
  password TEXT,
  email TEXT
);
CREATE TABLE post (
  id_post SERIAL PRIMARY KEY,
  author INT references myuser(id_user),
  comments int REFERENCES post(id_post),
  content TEXT,
  createdAt TEXT,
  updatedAt TEXT
);
INSERT INTO
  myuser (firstName, lastName, password, email)
VALUES('Alice', 'Hiron', '123', 'alice@gmail.com');
INSERT INTO
  myuser (firstName, lastName, password, email)
VALUES(
    'Léonard',
    'De Vinci',
    '123',
    'deVinci@gmail.com'
  );
INSERT INTO
  myuser (firstName, lastName, password, email)
VALUES(
    'Isaac',
    'Newton',
    '123',
    'newton@gmail.com'
  );
INSERT INTO
  myuser (firstName, lastName, password, email)
VALUES(
    'Marie',
    'Curie',
    '123',
    'curie@gmail.com'
  );
INSERT INTO
  myuser (firstName, lastName, password, email)
VALUES(
    'Louis',
    'Pasteur',
    '123',
    'pasteur@gmail.com'
  );
#-- Post Insertion
INSERT INTO
  post (author, comments, content, createdAt, updatedAt)
VALUES(
    1,
    1,
    'Hello from Alice : Qui ? Quoi ? Pourquoi ? Comment ?',
    '24 octobre 2021',
    ''
  );
INSERT INTO
  post (author, comments, content, createdAt, updatedAt)
VALUES(
    2,
    2,
    'Hello from Léonard : Piètre disciple, qui ne surpasse pas son maître ! ',
    '25 octobre 2021',
    ''
  );
INSERT INTO
  post (author, comments, content, createdAt, updatedAt)
VALUES(
    3,
    3,
    'Hello from Isaac : Les hommes construisent trop de murs et pas assez de ponts.',
    '26 octobre 2021',
    ''
  );
INSERT INTO
  post (author, comments, content, createdAt, updatedAt)
VALUES(
    4,
    4,
    'Hello from Marie : Dans la vie,rien n est à craindre, tout est à comprendre.',
    '27 octobre 2021',
    ''
  );
INSERT INTO
  post (author, comments, content, createdAt, updatedAt)
VALUES(
    5,
    5,
    ' Hello from Louis Pasteur : La science et la passion de comprendre sont - elles autre chose que l effet de l aiguillon du savoir qui met en notre â me le mystère de l Univers',
    '27 octobre 2021',
    ''
  );