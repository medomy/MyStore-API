CREATE TABLE orders (id SERIAL PRIMARY KEY,
products_ids_qtys json[],
userId int REFERENCES users(id),
address TEXT,
totalPrice int);