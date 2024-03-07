use [Event Ticket System]
 
create table [User](
	userID bigint identity(1, 1) primary key,
	userName varchar(256) not null,
	userEmail varchar(256) unique not null,
	userRole varchar(256) not null default 'customer' check (userRole in ('admin', 'customer')),
	salt varchar(20),
	hashedPassword varchar(256) not null
);

create table [Location](
	locationID bigint identity(1, 1) primary key,
	countryName varchar(256) not null,
	cityName varchar(256) not null,
	[address] varchar(256) not null
);

create table Venue(
	venueID bigint identity(1, 1) primary key,
	locationID bigint unique not null,
	foreign key (locationID) references [Location](locationID) 
	on delete cascade 
	on update cascade,
	[type] varchar(256) not null,
	capacity int not null
);

create table EventType(
	eventTypeID bigint identity(1, 1) primary key,
	eventTypeName varchar(256) unique not null
);

create table [Event](
	eventID bigint identity(1, 1) primary key,
	venueID bigint not null,
	foreign key (venueID) references Venue(venueID)
	on delete cascade
	on update cascade,
	eventTypeID bigint not null,
	foreign key (eventTypeID) references EventType(eventTypeID)
	on delete cascade
	on update cascade,
	eventDescription varchar(256),
	eventName varchar(256) not null,
	eventImageURL varchar(1000),
	startDate datetime not null,
	endDate datetime not null,
);

create table TicketCategory(
	ticketCategoryID bigint identity(1, 1) primary key,
	eventID bigint not null,
	foreign key (eventID) references [Event](eventID)
	on delete cascade
	on update cascade,
	ticketType varchar(256) not null check (ticketType in ('standard', 'vip')),
	price decimal (10, 2) not null,
	constraint UC_TicketCategory_Event unique (eventID, ticketType)
);

create table [Order](
	orderID bigint identity(1, 1) primary key,
	userID bigint not null,
	foreign key (userID) references [User](userID)
	on delete cascade
	on update cascade,
	ticketCategoryID bigint not null,
	foreign key (ticketCategoryID) references TicketCategory(ticketCategoryID)
	on delete cascade
	on update cascade,
	orderedAt datetime not null,
	numberOfTickets int check (numberOfTickets > 0) not null,
	totalPrice decimal(20, 2) check (totalPrice >= 0) not null
);

--drop table [Order];
--drop table TicketCategory;
--drop table [Event];
--drop table EventType;
--drop table Venue;
--drop table [Location];
--drop table [User];


