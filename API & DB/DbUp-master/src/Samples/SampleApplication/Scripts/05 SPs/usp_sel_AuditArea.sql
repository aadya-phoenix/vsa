IF EXISTS (SELECT * FROM sysobjects WHERE name = 'usp_sel_AuditArea' )
	DROP PROCEDURE [dbo].usp_sel_AuditArea
GO

CREATE PROCEDURE [dbo].usp_sel_AuditArea
AS
	SET NOCOUNT ON;
SELECT   *     
FROM            AuditArea
GO