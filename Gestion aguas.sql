drop database if exists s022045b_Gestion_Aguas;
create database if not exists s022045b_Gestion_Aguas;

use s022045b_Gestion_Aguas;

create table if not exists usuarios(
    nick varchar(75) primary key,
    password varchar(255) not null,
    email varchar(255) not null,
    rol enum ('administrador', 'abonado', 'mantenimiento')
) engine=innoDB default charset=utf8 collate=utf8_unicode_ci;