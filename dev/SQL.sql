create table shelf (
	id int identity not null, 
	brand varchar(255) not null, 
	location varchar(255), 
	sensorid varchar(255), 
	
	primary key (id)
)

create table customer (
	id int identity not null, 
	entry_time datetime2(6), 
	exit_time datetime2(6), 
	primary key (id)
)

delete from users where id = 8;
select * from users;

create table users (
	id int not null IDENTITY, 
	username varchar(255) NOT NULL UNIQUE,
	password varchar(255) not null, 
	role varchar(255), 
	 
	primary key (id)
)

drop table users;

grant create table to admin;

grant select,insert,update,delete on shelf to admin;
grant select,insert,update,delete on customer to admin;
grant select,insert,update,delete on users to admin;




