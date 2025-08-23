
create database cliente;

use cliente;

create table clientes(
id_client int primary key auto_increment not null,
full_name varchar(100) not null, 
document bigint unique not null,
address text,
phone varchar(12),
email varchar(100) unique,
create_at timestamp default current_timestamp,
update_at timestamp default current_timestamp on update current_timestamp 
);

create table platforms(
platform_id int auto_increment primary key,
name_plataform varchar(50) not null unique,
create_at timestamp default current_timestamp,
update_at timestamp default current_timestamp on update current_timestamp
);
 
create table invoices(
invoice_id int primary key auto_increment,
invoice_number varchar(100) not null unique,
client_id int not null,
biling_period date,
biling_amount decimal(12,2) default 0, 
paid_amount decimal(12,2) default 0,
create_at timestamp default current_timestamp,
update_at timestamp default current_timestamp on update current_timestamp,
foreign key (client_id) references clientes(id_client) on delete cascade on update cascade 
);

 create table transactions(
 transaction_id int primary key auto_increment,
 transaction_code varchar(20) not null unique,
 transaction_date datetime,
 amount decimal(12,2) default 0,
 status ENUM('Peding','Completed','Failed') default 'peding',
 transaction_type varchar(100),
 platform_id int,
 invoice_id int,
 create_at timestamp default current_timestamp,
 update_at timestamp default current_timestamp on update current_timestamp,
 foreign key (platform_id) references platforms(platform_id) on delete set null on update cascade,
 foreign key (invoice_id) references invoices(invoice_id) on delete cascade on update cascade
 );
 
select * from  clientes;deliverysemployees

