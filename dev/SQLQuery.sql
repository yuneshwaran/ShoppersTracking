--Db creation
create database shopperstracking;
use shopperstracking;

--table creation 

-- User Table
CREATE TABLE Users (
    ID INT PRIMARY KEY IDENTITY(1,1),
    username NVARCHAR(50) NOT NULL UNIQUE,
    email NVARCHAR(100) NOT NULL UNIQUE,
    createdOn DATETIME NOT NULL
);

-- Shelf Table
CREATE TABLE Shelf (
    ID INT PRIMARY KEY IDENTITY(1,1),
    brand NVARCHAR(100) NOT NULL,
    location NVARCHAR(100) NOT NULL
);

-- Shelf Sensor Table
CREATE TABLE ShelfSensor (
    ID INT PRIMARY KEY IDENTITY(1,1),
    shelfID INT FOREIGN KEY REFERENCES Shelf(ID),
    userID INT FOREIGN KEY REFERENCES Users(ID),
    detectionStart DATETIME NOT NULL,
    detectionEnd DATETIME NOT NULL
);

-- Hanger Sensor Table
CREATE TABLE HangerSensor (
    ID INT PRIMARY KEY IDENTITY(1,1),
    shelfID INT FOREIGN KEY REFERENCES Shelf(ID),
    startTime DATETIME NOT NULL,
    endTime DATETIME NOT NULL
);

-- Trial Room Log Table
CREATE TABLE TrialRoomLog (
    ID INT PRIMARY KEY IDENTITY(1,1),
    sensorID INT FOREIGN KEY REFERENCES HangerSensor(ID),
    inTime DATETIME NOT NULL,
    outTime DATETIME NOT NULL
);

-- Order Log Table
CREATE TABLE OrderLog (
    ID INT PRIMARY KEY IDENTITY(1,1),
    shelfID INT FOREIGN KEY REFERENCES Shelf(ID),
    orderTime DATETIME NOT NULL,
    quantity INT NOT NULL
);
