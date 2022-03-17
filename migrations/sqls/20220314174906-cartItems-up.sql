CREATE TABLE cartItems (id SERIAL PRIMARY KEY,
productId int REFERENCES products(id),
userId int REFERENCES users(id),
quantity int);