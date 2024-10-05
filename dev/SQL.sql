
--Table creation

create table users (id int not null IDENTITY, username varchar(255) NOT NULL UNIQUE,password varchar(255) not null, role varchar(255),	PRIMARY KEY (id))

create table brand (id int identity not null, description varchar(255), name varchar(255), shelf_id int, primary key (id));
create table product (id int identity not null, name varchar(255), price int not null, brand_id int, primary key (id))
create table shelf (id int identity not null, location varchar(255), name varchar(255), primary key (id))
create table inventory (id int identity not null, last_updated_on datetime2(6), quantity int not null, product_id int, primary key (id))
create table hanger_sensor (id int identity not null, last_updated_on datetime2(6) DEFAULT GETDATE(), product_id int, shelf_id int, primary key (id))
create table purchase_log (id int identity not null, customer_id int not null, purchase_date datetime2(6) DEFAULT GETDATE(), quantity int not null, total_price float(53) not null, product_id int, primary key (id))

create table trial_room (id int identity not null, location varchar(255), primary key (id))
create table trial_room_log (id int identity not null, customer_id int not null, entry_time datetime2(6), product_id int, trial_room_id int, primary key (id))

create table shelf_sensor (id int identity not null, shelf_id int not null, primary key (id))
create table shelf_sensor_log (id int identity not null, entry_time datetime2(6), exit_time datetime2(6), shelf_id int not null, primary key (id))

--Constraints
alter table product ADD constraint Defaultupdatedrecord DEFAULT GETDATE() FOR last_updated;

alter table brand add constraint FKpifyikpu06mnwlxsmwu9rhsla foreign key (shelf_id) references shelf

alter table inventory add constraint FKp7gj4l80fx8v0uap3b2crjwp5 foreign key (product_id) references product
alter table inventory add constraint ValidStock CHECK (quantity>=0);
alter table inventory ADD constraint DefaultCreated DEFAULT GETDATE() FOR last_updated_on;
alter table hanger_sensor add constraint FKpwbq0ll19qea16p1y6c6x505k foreign key (product_id) references product
alter table hanger_sensor add constraint FKmm75penk46torxsk7k9a8d2vl foreign key (shelf_id) references shelf

alter table purchase_log add constraint FKruc29okeix1t4qgh2b6v0btrh foreign key (product_id) references product
alter table trial_room_log add constraint FKf149sclra03ca61opbkc75k1 foreign key (product_id) references product
alter table trial_room_log add constraint FKn3mgnqvxtdodhfvrmuobfph2q foreign key (hanger_sensor_id) references hanger_sensor
alter table trial_room_log add constraint FKqicrt3rp1edi7w1uaru02f1tq foreign key (trial_room_id) references trial_room
alter table trial_room_log add hanger_sensor_id int
alter table shelf_sensor add constraint FKn7hjmx7ft16kp7ey6o1xbp398 foreign key (shelf_id) references shelf
alter table shelf_sensor_log add constraint FKi40y64m9rwupmypn1rx7vpmtq foreign key (shelf_id) references shelf

--permissions to user 'admin'

grant select,insert,update,delete on users to admin;

grant select,insert,update,delete on brand to admin;
grant select,insert,update,delete on product to admin;
grant select,insert,update,delete on shelf to admin;
grant select,insert,update,delete on hanger_sensor to admin;
grant select,insert,update,delete on shelf_sensor to admin;
grant select,insert,update,delete on shelf_sensor_log to admin;
grant select,insert,update,delete on inventory to admin;
grant select,insert,update,delete on trial_room to admin;

grant select,insert,update,delete on purchase_log to admin;
grant select,insert,update,delete on trial_room to admin;
grant select,insert,update,delete on trial_room_log to admin;



select * from hanger_sensor;

delete from shelf_sensor_log where exit_time is null;