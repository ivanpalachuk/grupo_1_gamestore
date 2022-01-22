CREATE DATABASE gamestore_db;

create table gamestore_db.pais (
id INT unsigned  primary key AUTO_increment,
nombre VARCHAR(30) not null );

create table gamestore_db.provincia(
id INT unsigned  primary key AUTO_increment,
nombre VARCHAR(30) not null,
idPais int unsigned,
foreign key (idPais) references pais(id));


create table gamestore_db.plataforma(
id INT unsigned  primary key AUTO_increment,
nombre VARCHAR(30) not null );

create table gamestore_db.categoria(
id INT unsigned  primary key AUTO_increment,
nombre VARCHAR(30) not null );

create table gamestore_db.imagen(
id INT unsigned  primary key AUTO_increment,
ruta VARCHAR(100) not null );

create table gamestore_db.dificultad(
id INT unsigned  primary key AUTO_increment,
nombre VARCHAR(30) not null
);

create table gamestore_db.edad(
id INT unsigned  primary key AUTO_increment,
nombre VARCHAR(30) not null,
idImagen int unsigned,
foreign key (idImagen) references imagen(id) );

create table gamestore_db.producto(
id INT unsigned  primary key AUTO_increment,
titulo VARCHAR(100) not null,
precio int unsigned,
descuento int unsigned,
resumen varchar(1000),
idDificultad int unsigned, 
idEdad int unsigned,
datosTecnicos varchar(1000),
requisitos varchar (1000),
legal varchar (1000),
idImagenPrincipal int unsigned,
idImagenSecundaria int unsigned,
foreign key (idEdad) references edad(id),
foreign key (idDificultad) references dificultad(id),
foreign key (idImagenPrincipal) references imagen(id),
foreign key (idImagenSecundaria) references imagen(id)
);

create table gamestore_db.usuario(
id INT unsigned  primary key AUTO_increment,
nombre VARCHAR(100) not null,
apellido VARCHAR(100) not null,
dni int unsigned,
idAvatar int unsigned,
correo varchar(255) unique,
userName varchar(255) unique, 
clave  varchar(255),
clave2 varchar(255),
idProvincia int unsigned,
idPais int unsigned,
direccion varchar(255),
numeroDireccion int unsigned,
codigoPostal int,
TYNO bool,
TCNO bool,
foreign key (idAvatar) references imagen(id),
foreign key (idProvincia) references provincia(id),
foreign key (idPais) references pais(id)
);


create table gamestore_db.inventario(
id int unsigned auto_increment primary key,
idUsuario int unsigned,
idProducto int unsigned,
foreign key (idUsuario) references usuario(id),
foreign key (idProducto) references producto(id)
);

create table gamestore_db.plataformaPivot(
id int unsigned auto_increment primary key,
idPlataforma int unsigned,
idProducto int unsigned,
foreign key (idPlataforma) references plataforma(id),
foreign key (idProducto) references producto(id)
);

create table gamestore_db.categoriaPivot(
id int unsigned auto_increment primary key,
idCategoria int unsigned,
idProducto int unsigned,
foreign key (idCategoria) references categoria(id),
foreign key (idProducto) references producto(id)
);



