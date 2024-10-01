create table users (
	id int not null IDENTITY, 
	username varchar(255) NOT NULL UNIQUE,
	password varchar(255) not null, 
	role varchar(255), 
	 
	PRIMARY KEY (id)
)
create table shelf (
	id int identity not null, 
	brand varchar(255), 
	size int not null, 
	stock int not null, 
	
	PRIMARY KEY (id)
)

create table shelf_sensor (
	id int not null, 
	product_id int, 
	shelf_id int, 
	
	primary key (id)
)
alter table shelf_sensor 
	add constraint FK9dyror8v9ovrus305dfs1vcjj 
	foreign key (id) references shelf

create table product (
	id int not null, 
	brand_name varchar(255), 
	price int not null, 
	product_name varchar(255), 
	stock int not null check (stock>0), 
	
	primary key (id)
)

select * from users;

grant select,insert,update,delete on shelf to admin;
grant select,insert,update,delete on users to admin;
grant select,insert,update,delete on shelf_sensor to admin;
grant select,insert,update,delete on product to admin;


--completed till






