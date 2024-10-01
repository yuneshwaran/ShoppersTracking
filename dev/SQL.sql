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

create table shelfsensor(
	id int identity not null, 
	shelfid int,
	
	PRIMARY KEY (id),
	FOREIGN KEY (shelfid) REFERENCES shelf(id)
)

select * from users;
grant select,insert,update,delete on shelf to admin;
grant select,insert,update,delete on users to admin;
grant select,insert,update,delete on shelfsensor to admin;


--completed till






