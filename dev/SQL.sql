
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

-- Insert random shelf sensor log entries for 2-3 months (Aug 2024 - Oct 2024)
DECLARE @i INT = 1;
DECLARE @numRecords INT = 100;  -- Set how many records you want to generate
DECLARE @shelf_ids TABLE (id INT);  -- Create a table to hold shelf ids

-- Insert the shelf ids into the temp table
INSERT INTO @shelf_ids (id)
VALUES (1), (2), (3), (4), (6), (7), (8);

WHILE @i <= @numRecords
BEGIN
    DECLARE @randomShelfId INT;
    DECLARE @entry_time DATETIME2(6);
    DECLARE @exit_time DATETIME2(6);
    
    -- Select a random shelf_id from the table
    SELECT @randomShelfId = id
    FROM @shelf_ids
    ORDER BY NEWID();
    
    -- Generate random entry_time between Aug 1, 2024, and Oct 31, 2024
    SET @entry_time = DATEADD(SECOND, ABS(CHECKSUM(NEWID()) % 86400), 
                     DATEADD(DAY, ABS(CHECKSUM(NEWID()) % 92), '2024-08-01T00:00:00.000'));
    
    -- Generate random exit_time (within a range of 1 to 3600 seconds after entry_time)
    SET @exit_time = DATEADD(SECOND, ABS(CHECKSUM(NEWID()) % 3600), @entry_time);

    -- Insert the generated data into the shelf_sensor_log table
    INSERT INTO [dbo].[shelf_sensor_log] (entry_time, exit_time, shelf_id)
    VALUES (@entry_time, @exit_time, @randomShelfId);
    
    -- Increment the loop counter
    SET @i = @i + 1;
END;

-- Verify that records were inserted
SELECT * FROM [dbo].[shelf_sensor_log];


--trial logs entry 
-- Generate random data for purchase_log table
DECLARE @MinDate DATE = '2024-04-01'; -- 6 months before October 2024
DECLARE @MaxDate DATE = '2024-10-31'; -- End of October 2024
DECLARE @Counter INT = 1;

WHILE @Counter <= 30 -- Adjust number of entries as needed
BEGIN
    INSERT INTO [dbo].[purchase_log] (purchase_date, quantity, total_price, product_id)
    VALUES (
        -- Random date between @MinDate and @MaxDate
        DATEADD(DAY, ABS(CHECKSUM(NEWID())) % (DATEDIFF(DAY, @MinDate, @MaxDate) + 1), @MinDate), 
        -- Random quantity between 1 and 10
        ABS(CHECKSUM(NEWID())) % 10 + 1, 
        -- Random total price between 300 and 3000
        CAST((ABS(CHECKSUM(NEWID())) % 2701 + 300) AS FLOAT), 
        -- Random product_id from the given list
        CASE ABS(CHECKSUM(NEWID())) % 17
            WHEN 0 THEN 3
            WHEN 1 THEN 5
            WHEN 2 THEN 7
            WHEN 3 THEN 9
            WHEN 4 THEN 11
            WHEN 5 THEN 13
            WHEN 6 THEN 16
            WHEN 7 THEN 18
            WHEN 8 THEN 20
            WHEN 9 THEN 22
            WHEN 10 THEN 21
            WHEN 11 THEN 24
            WHEN 12 THEN 26
            WHEN 13 THEN 28
            WHEN 14 THEN 30
            WHEN 15 THEN 32
            WHEN 16 THEN 34
            ELSE 35 -- Default, in case of unexpected value
        END
    );
    
    SET @Counter = @Counter + 1;
END;


