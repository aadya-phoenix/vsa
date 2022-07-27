-- Creates the following tables:
--  * Users

IF NOT EXISTS(SELECT 1 FROM sys.tables WHERE name='Users')
BEGIN
CREATE TABLE [dbo].[Users]
(
	  [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, 
    [Name] NVARCHAR(50) NULL, 
    [RoleId] UNIQUEIDENTIFIER NULL, 
    [Email] NVARCHAR(50) NULL, 
    [MobileNo] NVARCHAR(50) NULL, 
    [UserName] NVARCHAR(50) NULL, 
    [Password] NVARCHAR(50) NULL, 
    [IsActive] BIT DEFAULT 0 NULL,
    [CreatedBy] INT NOT NULL,
    [CreatedDate] DATETIME NOT NULL,
    [ModifiedBy] INT NULL,
    [ModifiedDate] DATETIME NULL
)
END

go

IF NOT EXISTS(SELECT 1 FROM sys.tables WHERE name='Role')
BEGIN
CREATE TABLE [dbo].[Role] (
    [Id]     UNIQUEIDENTIFIER NOT NULL,
    [Name]   NVARCHAR (50)    NULL,
    [Active] BIT DEFAULT 0 NULL,
    [CreatedBy] INT NOT NULL,
    [CreatedDate] DATETIME NOT NULL,
    [ModifiedBy] INT NULL,
    [ModifiedDate] DATETIME NULL
    PRIMARY KEY CLUSTERED ([Id] ASC)
);
END

go

IF NOT EXISTS(SELECT 1 FROM sys.tables WHERE name='RoleAccess')
BEGIN
CREATE TABLE [dbo].[RoleAccess]
(
	  [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, 
    [PageId] UNIQUEIDENTIFIER NULL, 
    [RoleId] UNIQUEIDENTIFIER NULL, 
    [Add] BIT DEFAULT 0 NULL,
    [Edit] BIT DEFAULT 0 NULL,
    [Delete] BIT DEFAULT 0 NULL,
    [CreatedBy] INT NOT NULL,
    [CreatedDate] DATETIME NOT NULL,
    [ModifiedBy] INT NULL,
    [ModifiedDate] DATETIME NULL
);
END

go

IF NOT EXISTS(SELECT 1 FROM sys.tables WHERE name='Page')
BEGIN
CREATE TABLE [dbo].[Page]
(
	  [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, 
    [Name] NVARCHAR(100) NULL, 
    [PageUrl] NVARCHAR(500) NULL,
    [Active] BIT DEFAULT 0 NULL,
    [CreatedBy] INT NOT NULL,
    [CreatedDate] DATETIME NOT NULL,
    [ModifiedBy] INT NULL,
    [ModifiedDate] DATETIME NULL
);
END

go

IF NOT EXISTS(SELECT 1 FROM sys.tables WHERE name='Category')
BEGIN
CREATE TABLE [dbo].[Category]
(
	  [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, 
    [Name] NVARCHAR(100) NULL,
    [Active] BIT DEFAULT 0 NULL,
    [CreatedBy] INT NOT NULL,
    [CreatedDate] DATETIME NOT NULL,
    [ModifiedBy] INT NULL,
    [ModifiedDate] DATETIME NULL
);
END

go

IF NOT EXISTS(SELECT 1 FROM sys.tables WHERE name='AuditArea')
BEGIN
CREATE TABLE [dbo].[AuditArea]
(
	  [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, 
    [Name] NVARCHAR(100) NOT NULL,
    [CategoryId] UNIQUEIDENTIFIER NOT NULL,
    [Active] BIT DEFAULT 0 NULL,
    [CreatedBy] INT NOT NULL,
    [CreatedDate] DATETIME NOT NULL,
    [ModifiedBy] INT NULL,
    [ModifiedDate] DATETIME NULL
);
END

go

IF NOT EXISTS(SELECT 1 FROM sys.tables WHERE name='Location')
BEGIN
CREATE TABLE [dbo].[Location]
(
	  [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, 
    [Name] NVARCHAR(100) NOT NULL,
    [Active] BIT DEFAULT 0 NULL,
    [CreatedBy] INT NOT NULL,
    [CreatedDate] DATETIME NOT NULL,
    [ModifiedBy] INT NULL,
    [ModifiedDate] DATETIME NULL
);
END

go

IF NOT EXISTS(SELECT 1 FROM sys.tables WHERE name='Vendor')
BEGIN
CREATE TABLE [dbo].[Vendor]
(
	  [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, 
    [Name] NVARCHAR(100) NOT NULL,
    [Code] NVARCHAR(100) NOT NULL,
    [AdditionalCode] NVARCHAR(100) NULL,
    [SubCode] NVARCHAR(100) NULL,
    [CategoryId] UNIQUEIDENTIFIER NOT NULL,
    [Email] NVARCHAR(100) NULL,
    [ContactNo] NVARCHAR(100) NULL,
    [Image] NVARCHAR(500) NULL,
    [UserName] NVARCHAR(100) NULL,
    [Password] NVARCHAR(100) NULL,
    [Active] BIT DEFAULT 0 NULL,
    [CreatedBy] INT NOT NULL,
    [CreatedDate] DATETIME NOT NULL,
    [ModifiedBy] INT NULL,
    [ModifiedDate] DATETIME NULL
);
END

go
