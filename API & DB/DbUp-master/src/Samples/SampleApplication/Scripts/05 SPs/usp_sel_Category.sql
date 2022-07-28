IF EXISTS (SELECT * FROM sysobjects WHERE name = 'usp_sel_Category' AND user_name(uid) = 'dbo')
	DROP PROCEDURE [dbo].usp_sel_Category
GO

CREATE PROCEDURE [dbo].usp_sel_Category
AS
	SET NOCOUNT ON;
SELECT        Id, Name, Active, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate
FROM            Category
GO