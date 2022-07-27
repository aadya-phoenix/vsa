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
    [IsActive] BIT NULL
)
END

IF NOT EXISTS(SELECT 1 FROM sys.tables WHERE name='Role')
BEGIN
CREATE TABLE [dbo].[Role] (
    [Id]     UNIQUEIDENTIFIER NOT NULL,
    [Name]   NVARCHAR (50)    NULL,
    [Active] BIT              NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);
END

IF NOT EXISTS(SELECT 1 FROM sys.tables WHERE name='RoleAccess')
BEGIN
CREATE TABLE [dbo].[RoleAccess]
(
	[Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, 
    [PageId] UNIQUEIDENTIFIER NULL, 
    [RoleId] UNIQUEIDENTIFIER NULL, 
    [Add] BIT NULL, 
    [Edit] BIT NULL, 
    [Delete] BIT NULL
);
END

go