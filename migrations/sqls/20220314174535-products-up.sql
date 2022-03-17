/* Replace with your SQL commands */
CREATE TABLE products (id SERIAL PRIMARY KEY,
title VARCHAR,
 price integer,
description text,
 company VARCHAR,
  categoryId int REFERENCES categories(id),
   photoSrc VARCHAR);