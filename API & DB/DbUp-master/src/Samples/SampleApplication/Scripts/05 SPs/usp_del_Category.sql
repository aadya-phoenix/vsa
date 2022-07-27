IF EXISTS (SELECT * FROM sysobjects WHERE name = 'usp_del_Category' )
	DROP PROCEDURE [dbo].usp_del_Category
GO

CREATE PROCEDURE [dbo].usp_del_Category
(
	@Id uniqueidentifier	
)
AS
	SET NOCOUNT OFF;
DELETE FROM [Category] WHERE (([Id] = @Id))
GO

