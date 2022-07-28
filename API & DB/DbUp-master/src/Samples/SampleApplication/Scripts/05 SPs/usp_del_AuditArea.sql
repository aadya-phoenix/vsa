IF EXISTS (SELECT * FROM sysobjects WHERE name = 'usp_del_AuditArea' )
	DROP PROCEDURE [dbo].usp_del_AuditArea
GO

CREATE PROCEDURE [dbo].usp_del_AuditArea
(
	@Id uniqueidentifier
	
)
AS
	SET NOCOUNT OFF;
DELETE FROM [AuditArea] WHERE (([Id] = @Id))
GO

