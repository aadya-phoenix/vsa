IF EXISTS (SELECT * FROM sysobjects WHERE name = 'usp_upd_Category' )
	DROP PROCEDURE [dbo].usp_upd_Category
GO

CREATE PROCEDURE [dbo].usp_upd_Category
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
UPDATE [Category] SET [Id] = @Id, [Name] = @Name, [Active] = @Active, [CreatedBy] = @CreatedBy, [CreatedDate] = @CreatedDate, [ModifiedBy] = @ModifiedBy, [ModifiedDate] = @ModifiedDate
WHERE (([Id] = @Id));
	
SELECT Id, Name, Active, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate FROM Category WHERE (Id = @Id)
GO

