
--Table creation
create table users (id int not null IDENTITY, username varchar(255) NOT NULL UNIQUE,password varchar(255) not null, role varchar(255),	PRIMARY KEY (id))

create table brand (id int identity not null, description varchar(255), name varchar(255), shelf_id int, primary key (id));

create table product (id int identity not null, name varchar(255), price int not null, brand_id int, primary key (id))

create table shelf (id int identity not null, location varchar(255), name varchar(255), primary key (id))

create table inventory (id int identity not null, last_updated_on datetime2(6), quantity int not null, product_id int, primary key (id))

create table hanger_sensor (id int identity not null, last_updated_on datetime2(6) DEFAULT GETDATE(), product_id int, shelf_id int, primary key (id))

create table purchase_log (id int identity not null, customer_id int not null, purchase_date datetime2(6) DEFAULT GETDATE(), quantity int not null, total_price float(53) not null, product_id int, primary key (id))
alter table purchase_log drop column customer_id;

create table trial_room (id int identity not null, location varchar(255), primary key (id))

create table trial_room_log (id int identity not null, customer_id int not null, entry_time datetime2(6), product_id int, trial_room_id int, primary key (id))
alter table trial_room_log add hanger_sensor_id int

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
alter table shelf_sensor add constraint FKn7hjmx7ft16kp7ey6o1xbp398 foreign key (shelf_id) references shelf
alter table shelf_sensor_log add constraint FKi40y64m9rwupmypn1rx7vpmtq foreign key (shelf_id) references shelf


ALTER TABLE shelf_sensor_log 
ADD duration AS DATEDIFF(SECOND, entry_time, exit_time) PERSISTED;

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



select * from shelf_sensor_log;
select * from trial_room_log;
select * from inventory;


delete from inventory where product_id is null;

truncate table trial_room_log;
INSERT INTO trial_room_log (customer_id, entry_time, product_id, trial_room_id, hanger_sensor_id) VALUES 
(122, '2024-08-19 13:35:05', 21, 1, 8),
(119, '2024-08-06 10:42:05', 5, 1, 15),
(119, '2024-10-06 23:10:05', 33, 8, 23),
(110, '2024-10-08 01:54:05', 35, 1, 23),
(126, '2024-10-11 22:31:05', 9, 1, 1),
(104, '2024-07-24 22:51:05', 20, 4, 5),
(105, '2024-09-23 16:53:05', 33, 5, 20),
(130, '2024-08-08 15:10:05', 22, 6, 14),
(123, '2024-09-20 00:16:05', 21, 5, 23),
(117, '2024-09-08 09:22:05', 35, 6, 8),
(111, '2024-08-01 13:04:05', 3, 1, 21),
(103, '2024-07-21 01:07:05', 37, 8, 1),
(123, '2024-10-08 23:29:05', 22, 8, 5),
(102, '2024-08-29 00:03:05', 16, 7, 15),
(110, '2024-09-01 07:17:05', 37, 3, 23),
(102, '2024-10-02 17:01:05', 24, 6, 10),
(115, '2024-09-22 05:44:05', 37, 6, 9),
(108, '2024-08-11 11:06:05', 9, 3, 16),
(119, '2024-08-29 02:27:05', 18, 8, 2),
(106, '2024-08-20 03:37:05', 5, 5, 12),
(130, '2024-08-30 14:53:05', 28, 7, 22),
(118, '2024-08-03 10:10:05', 18, 5, 15),
(116, '2024-09-07 11:12:05', 20, 8, 17);
