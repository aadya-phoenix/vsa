IF EXISTS (SELECT * FROM sysobjects WHERE name = 'usp_upd_AuditArea')
	DROP PROCEDURE [dbo].usp_upd_AuditArea
GO

CREATE PROCEDURE [dbo].usp_upd_AuditArea
(
	@Id uniqueidentifier,
	@Name nvarchar(100),
	@CategoryId uniqueidentifier,
	@Active bit,
	@CreatedBy int,
	@CreatedDate datetime,
	@ModifiedBy int,
	@ModifiedDate datetime,
	@Original_Id uniqueidentifier
)
AS
	SET NOCOUNT OFF;
UPDATE [AuditArea] SET [Id] = @Id, [Name] = @Name, [CategoryId] = @CategoryId, [Active] = @Active, [CreatedBy] = @CreatedBy, [CreatedDate] = @CreatedDate, [ModifiedBy] = @ModifiedBy, [ModifiedDate] = @ModifiedDate
WHERE (([Id] = @Id));
	
SELECT Id, Name, CategoryId, Active, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate FROM AuditArea WHERE (Id = @Id)
GO
