DROP DATABASE if exists Bamazon_db;

CREATE DATABASE Bamazon_db;

USE Bamazon_db;

CREATE TABLE products(
item_id INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR(30),
department_name VARCHAR(30),
price DECIMAL(10,4),
stock_quantity INTEGER,
PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("toothpaste", "hygiene", 3.48, 220);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("daipers", "baby", 18.98, 300);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("peanuts", "snacks", 2.50, 550);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES( "mouth wash", "hygiene", 3.50, 100);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("headphones", "accessories", 35.00, 80);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("phone charger", "accessories", 20.80, 85);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("deodorant", "hygiene", 4.25, 125);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("red shirt", "clothing", 14.88, 45);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("black socks", "clothing", 8.99, 55);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("pacifier", "baby", 4.80, 35);

