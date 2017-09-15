drop database if exists Bamazon_db;

create database Bamazon_db;

use Bamazon_db;

create table products(
item_id integer auto_increment not null,
product_name varchar(30),
department_name varchar(30),
price decimal(5,2),
stock_quantity integer,
primary key(item_id)
);

insert into products(product_name, department_name, price, stock_quantity) values("toothpaste", "hygiene", 3.48, 220);
insert into products(product_name, department_name, price, stock_quantity) values("daipers", "baby", 18.98, 300);
insert into products(product_name, department_name, price, stock_quantity) values("peanuts", "snacks", 2.50, 550);
insert into products(product_name, department_name, price, stock_quantity) values( "mouth wash", "hygiene", 3.50, 100);
insert into products(product_name, department_name, price, stock_quantity) values("headphones", "accessories", 35.00, 80);
insert into products(product_name, department_name, price, stock_quantity) values("phone charger", "accessories", 20.80, 85);
insert into products(product_name, department_name, price, stock_quantity) values("deodorant", "hygiene", 4.25, 125);
insert into products(product_name, department_name, price, stock_quantity) values("red shirt", "clothing", 14.88, 45);
insert into products(product_name, department_name, price, stock_quantity) values("black socks", "clothing", 8.99, 55);
insert into products(product_name, department_name, price, stock_quantity) values("pacifier", "baby", 4.80, 35);

