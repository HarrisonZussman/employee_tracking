DROP database if exists empolyee_tracker_db;
create database empolyee_tracker_db;

use empolyee_tracker_db;

CREATE table department (
id int not null	auto_increment primary key,
name varchar(30) not null
);

create table roles (
id int not null	auto_increment primary key,
title varchar(30) not null,
salary decimal,
department_id int
);

create table employee (
id int not null	auto_increment primary key,
first_name varchar(30) not null,
last_name varchar(30) not null,
roles_id int,
manager_id int
);