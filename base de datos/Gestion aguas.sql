drop database if exists s022045b_Gestion_Aguas;
create database if not exists s022045b_Gestion_Aguas;

use s022045b_Gestion_Aguas;

-- Tabla usuarios.
create table usuarios(
    usuario varchar(20) primary key,
    pass varchar(64) not null
)engine=innoDB default charset=latin1 collate=latin1_spanish_ci;

-- Creación del usuario admin.
insert into usuarios select 'admin' , sha2('admin',256);

-- Tabla abonados.
create table if not exists abonados(
    NIF varchar(9) primary key,
    Nombre varchar(50) not null,
    Apellido1 varchar(50) not null,
    Apellido2 varchar(50) not null,
    Direccion varchar (255) not null,
    Email varchar(255) not null,
    Telefono varchar(9) not null,
    Iban varchar(24) not null
) engine=innoDB default charset=latin1 collate=latin1_spanish_ci;

-- Tabla dispositivos.
create table if not exists dispositivos(
    Id int auto_increment, 
    NIF varchar(9), 
    Puesta_servicio date not null,
    Latitud varchar(20) not null,
    Longitud varchar(20) not null,
    Direccion varchar (255) not null,
    Medida decimal(10,2) not null,
    primary key (Id),
    constraint fk_nif foreign key (NIF) references abonados(NIF) on delete cascade on update cascade
) engine=innoDB default charset=latin1 collate=latin1_spanish_ci;

-- Tabla consumos.
create table if not exists consumos(
    IdDispositivo int,
    Fecha_medida date,
    Medida decimal(10,2) not null,
    Precio decimal(6,2) not null,
    primary key (IdDispositivo, Fecha_Medida),
    constraint fk_id_dispositivo foreign key (IdDispositivo) references dispositivos(Id) on delete cascade on update cascade
) engine=innoDB default charset=latin1 collate=latin1_spanish_ci;