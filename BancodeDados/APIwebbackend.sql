create database APIwebbackend;
use APIwebbackend;
create table Usuarios(
codigo int primary key auto_increment,
nome varchar(50) not null,
email varchar(50) not null,
senha varchar(20) not null
);

create table Albuns (
cod_album int primary key auto_increment,
nome varchar(50),
artista varchar(50),
anolancamento int,
capa varchar(300)
);


insert into Usuarios (nome, email, senha) values
  ('João Silva', 'joao@email.com', '123'),
  ('Maria Santos', 'maria@email.com', '456'),
  ('Pedro Almeida', 'pedro@email.com', '789'),
  ('Ana Pereira', 'ana@email.com', '123'),
  ('Bruno Oliveira', 'bruno@email.com', '456'),
  ('Carla Souza', 'carla@email.com', '789'),
  ('Marcos Santos', 'marcos@email.com', '123'),
  ('Juliana Lima', 'juliana@email.com', '456');

 insert into Albuns (nome, artista, anolancamento, capa) 
 values ('Sgt.Peppers Lonely Hearts Club Band', 'The Beatles', '1967', 'https://upload.wikimedia.org/wikipedia/en/5/50/Sgt._Pepper%27s_Lonely_Hearts_Club_Band.jpg'),
		    ('Thriller', 'Michael Jackson', '1982', 'https://upload.wikimedia.org/wikipedia/pt/3/30/Michael_Jackson_-_Thriller.jpg'),
        ('Acabou Chorare', 'Novos Baianos', '1972', 'https://upload.wikimedia.org/wikipedia/pt/f/f6/AcabouChorare.jpg'),
        ('Tropicália ou Panis et Circencis', 'Vários Artistas', '1968', 'https://upload.wikimedia.org/wikipedia/pt/e/e2/PaniseCircenses.jpeg');
        