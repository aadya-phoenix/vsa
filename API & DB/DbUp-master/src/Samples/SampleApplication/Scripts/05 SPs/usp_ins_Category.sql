IF EXISTS (SELECT * FROM sysobjects WHERE name = 'usp_ins_Category')
	DROP PROCEDURE [dbo].usp_ins_Category
GO

CREATE PROCEDURE [dbo].usp_ins_Category
(
	@Id uniqueidentifier,
	@Name nvarchar(100),
	@Active bit,
	@CreatedBy int,
	@CreatedDate datetime,
	@ModifiedBy int,
	@ModifiedDate datetime
)
AS
	SET NOCOUNT OFF;
INSERT INTO [Category] ([Id], [Name], [Active], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (@Id, @Name, @Active, @CreatedBy, @CreatedDate, @ModifiedBy, @ModifiedDate);
	
SELECT Id, Name, Active, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate FROM Category WHERE (Id = @Id)
GO