IF EXISTS (SELECT * FROM sysobjects WHERE name = 'usp_ins_AuditArea')
	DROP PROCEDURE [dbo].usp_ins_AuditArea
GO

CREATE PROCEDURE [dbo].usp_ins_AuditArea
(
	@Id uniqueidentifier,
	@Name nvarchar(100),
	@CategoryId uniqueidentifier,
	@Active bit,
	@CreatedBy int,
	@CreatedDate datetime,
	@ModifiedBy int,
	@ModifiedDate datetime
)
AS
	SET NOCOUNT OFF;
INSERT INTO [AuditArea] ([Id], [Name], [CategoryId], [Active], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (@Id, @Name, @CategoryId, @Active, @CreatedBy, @CreatedDate, @ModifiedBy, @ModifiedDate);
	
SELECT Id, Name, CategoryId, Active, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate FROM AuditArea WHERE (Id = @Id)
GO