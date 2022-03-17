CREATE TABLE comments (id SERIAL PRIMARY KEY,
commentBody text,
userId int REFERENCES users(id),
commentTitle VARCHAR,
rating int);