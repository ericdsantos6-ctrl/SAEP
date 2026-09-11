create database saepsaude;

use saepsaude;

create table empresa (
    id int auto_increment primary key,
    nome varchar(150) not null,
    descricao text,
    email varchar(150),
    telefone varchar(30),
    endereco varchar(255)
);

create table usuarios (
    id int auto_increment primary key,
    nome varchar(150) not null,
    email varchar(150) not null unique,
    senha varchar(255) not null,
    foto varchar(255),
    criado_em timestamp default current_timestamp
);

create table atividades (
    id int auto_increment primary key,
    usuario_id int not null,
    titulo varchar(150) not null,
    descricao text,
    tipo enum('corrida', 'caminhada', 'trilha') not null,
    data_atividade date not null,
    horario time,
    distancia decimal(8,2),
    duracao varchar(50),
    local varchar(255),
    imagem varchar(255),
    criado_em timestamp default current_timestamp,

    foreign key (usuario_id)
        references usuarios(id)
        on delete cascade
        on update cascade
);

create table likes (
    id int auto_increment primary key,
    usuario_id int not null,
    atividade_id int not null,
    criado_em timestamp default current_timestamp,

    unique key usuario_atividade (usuario_id, atividade_id),

    foreign key (usuario_id)
        references usuarios(id)
        on delete cascade
        on update cascade,

    foreign key (atividade_id)
        references atividades(id)
        on delete cascade
        on update cascade
);

create table comentarios (
    id int auto_increment primary key,
    usuario_id int not null,
    atividade_id int not null,
    comentario text not null,
    criado_em timestamp default current_timestamp,

    foreign key (usuario_id)
        references usuarios(id)
        on delete cascade
        on update cascade,

    foreign key (atividade_id)
        references atividades(id)
        on delete cascade
        on update cascade
);

show tables;

use saepsaude;

describe empresa;
describe usuarios;
describe atividades;
describe likes;
describe comentarios;

USE saepsaude;

SELECT * FROM atividades;

SELECT * FROM usuarios;

SELECT * FROM likes;

SELECT * FROM comentarios;

SELECT * FROM empresa;