
--Table creation

create table users (id int not null IDENTITY, username varchar(255) NOT NULL UNIQUE,password varchar(255) not null, role varchar(255),	PRIMARY KEY (id))
create table brand (id int identity not null, description varchar(255), name varchar(255), shelf_id int, primary key (id));
create table hanger_sensor (id int identity not null, product_id int, shelf_id int, primary key (id))
create table product (id int identity not null, name varchar(255), price int not null, brand_id int, primary key (id))
create table shelf (id int identity not null, location varchar(255), name varchar(255), primary key (id))
create table shelf_sensor (shelf_sensor_id int identity not null, created_on datetime2(6), shelf_id int, primary key (shelf_sensor_id))
create table inventory (id int identity not null, last_updated_on datetime2(6), quantity int not null, product_id int, primary key (id))


--Constraints

alter table brand add constraint FKpifyikpu06mnwlxsmwu9rhsla foreign key (shelf_id) references shelf
alter table hanger_sensor add constraint FKpwbq0ll19qea16p1y6c6x505k foreign key (product_id) references product
alter table hanger_sensor add constraint FKmm75penk46torxsk7k9a8d2vl foreign key (shelf_id) references shelf
alter table product add constraint FKs6cydsualtsrprvlf2bb3lcam foreign key (brand_id) references brand
alter table shelf_sensor add constraint FKn7hjmx7ft16kp7ey6o1xbp398 foreign key (shelf_id) references shelf
alter table shelf_sensor ADD CONSTRAINT DF_createdON DEFAULT GETDATE() for created_on;
alter table inventory add constraint FKp7gj4l80fx8v0uap3b2crjwp5 foreign key (product_id) references product
alter table inventory ADD constraint DefaultCreated DEFAULT GETDATE() FOR last_updated_on;


--permissions to user 'admin'

grant select,insert,update,delete on users to admin;

grant select,insert,update,delete on brand to admin;
grant select,insert,update,delete on product to admin;
grant select,insert,update,delete on shelf to admin;
grant select,insert,update,delete on hanger_sensor to admin;
grant select,insert,update,delete on shelf_sensor to admin;
grant select,insert,update,delete on inventory to admin;



