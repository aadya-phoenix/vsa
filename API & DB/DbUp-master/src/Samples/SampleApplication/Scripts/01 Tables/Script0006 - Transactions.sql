/****** Object:  StoredProcedure [dbo].[usp_sel_Users_GetLoginDetailByUserName]    Script Date: 11/25/2020 9:33:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
IF EXISTS(SELECT 1 FROM sys.objects WHERE name = 'usp_sel_Users_GetLoginDetailByUserName')
BEGIN
	DROP PROC usp_sel_Users_GetLoginDetailByUserName 
END
GO
CREATE PROCEDURE [dbo].[usp_sel_Users_GetLoginDetailByUserName]
(@userName VARCHAR(50))
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select  Users.Id,Users.Name,Users.Email,Users.MobileNo,Users.UserName,Users.Password,Users.IsActive,
            Role.Id,Role.Name as RoleName,roles.Edit from Users INNER JOIN Role on(Users.RoleId=Role.Id) 
            INNER JOIN RoleAccess roles on(roles.RoleId=Role.Id)
    where Users.Name = @userName
END
GO