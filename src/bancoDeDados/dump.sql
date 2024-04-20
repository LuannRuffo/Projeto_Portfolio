create database portfolio

create table if not exists usuarios (
id serial primary key,
 name varchar(50),
 senha varchar (150) not null,
 email varchar (50) unique not null,
 username varchar (50) unique not null
);