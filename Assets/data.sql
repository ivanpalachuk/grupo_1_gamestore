insert into pais (id, nombre) values (1, 'Argentina');
insert into pais (id, nombre) values (2, 'Brazil');
insert into pais (id, nombre) values (3, 'Uruguay');
insert into pais (id, nombre) values (4, 'España');
insert into pais (id, nombre) values (5, 'Peru');

insert into provincia (id, nombre,idPais) values (1, 'CABA',1);
insert into provincia (id, nombre,idPais) values (2, 'Buenos Aires',1);
insert into provincia (id, nombre,idPais) values (3, 'Mendoza',1);
insert into provincia (id, nombre,idPais) values (4, 'Cordoba',1);
insert into provincia (id, nombre,idPais) values (5, 'San Luis',1);

insert into imagen (id, ruta) values (1, '/');
insert into imagen (id, ruta) values (2, '/');
insert into imagen (id, ruta) values (3, '/');
insert into imagen (id, ruta) values (4, '/age-of-empire-3.jpg');
insert into imagen (id, ruta) values (5, '/age-of-empire-2.jpg');

insert into categoria (id,nombre) values (1,'Estrategia');
insert into categoria (id,nombre) values (2,'Shooter');
insert into categoria (id,nombre) values (3,'INDIE');
insert into categoria (id,nombre) values (4,'Sport');
insert into categoria (id,nombre) values (5,'Terror');

insert into dificultad (id,nombre) values (1,'Facil');
insert into dificultad (id,nombre) values (2,'Normal');
insert into dificultad (id,nombre) values (3,'Dificil');

insert into edad (id,nombre,idImagen) values (1,'T',1);
insert into edad (id,nombre,idImagen) values (2,'M',2);
insert into edad (id,nombre,idImagen) values (3,'E',3);

insert into plataforma (id, nombre) values (1, 'PC');
insert into plataforma (id, nombre) values (2, 'PS5');
insert into plataforma (id, nombre) values (3, 'PS4');
insert into plataforma (id, nombre) values (4, 'XBOX');
insert into plataforma (id, nombre) values (5, 'FAMILYGAME');

insert into producto (id,titulo,precio,descuento,resumen,idDificultad,idEdad,datosTecnicos,requisitos,legal,idImagenPrincipal,idImagenSecundaria) 
values(1,'Age of Empires', 299, 15, 'Te aguarda una experiencia de juego de más de 200 horas que abarca todo un milenio de la historia humana! Juega en línea para desafiar a otros jugadores en tu empresa por dominar el mundo con 35 civilizaciones diferentes. Asimismo, ¡puedes experimentar nuevas civilizaciones y campañas con el DLC Señores de Occidente! Las actualizaciones más recientes abarcan el modo Batalla campal, soporte continuo para el Editor de escenarios, la función Partida rápida para librar partidas sociales con mayor facilidad, mejoras en la IU del juego ¡y mucho más! Traza tu camino hacia la grandeza con la llamativa y cautivadora remasterización de uno de los juegos de estrategia más queridos de todos los tiempos.',
1,1,'1 jugador  Plataforma: PC Lanzamiento: 14/11/2019, Editor: Xbox Game Studios Género: Estrategia Idiomas de pantalla: Alemán, Chino - Simplificado, Chino - Tradicional, Español, Francés (Francia), Inglés, Portugués (Brasil), Ruso.',
'Requiere un procesador y un sistema operativo de 64 bits, SO: Windows 10 64bit, Procesador: Intel Core 2 Duo or AMD Athlon 64x2 5600+, Memoria: 4 GB de RAM, Gráficos: NVIDIA® GeForce® GT 420 or ATI™ Radeon™ HD 6850 or Intel® HD Graphics 4000 or better with 2 GB VRAM',
'https://privacy.microsoft.com/es-ES/privacystatement',4,5);

insert into usuario (id,nombre,apellido,dni,idAvatar,correo,userName,clave,clave2,idProvincia,idPais,direccion,numeroDireccion,codigoPostal,TYNO,TCNO)
values (1, 'Ivan', 'Palachuk', 32241234,5,'ivanzar@hotmail.com','Zarseven','hash','hash2',2,1,'Alcorta',1554,7600,1,1);

insert into plataformaPivot (id, idPlataforma, idProducto) values (1, 1, 1);
insert into plataformaPivot (id, idPlataforma, idProducto) values (1, 1, 5);

insert into categoriaPivot (id, idPlataforma, idProducto) values (1, 1, 1);
 