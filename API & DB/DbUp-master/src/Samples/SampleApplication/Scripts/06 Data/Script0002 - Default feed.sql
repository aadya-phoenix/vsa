-- Initial setup data
INSERT INTO [dbo].[RoleAccess] ([Id], [PageId], [RoleId], [Add], [Edit], [Delete],[CreatedBy],[CreatedDate]) VALUES (N'cbb36db9-ed1b-4e73-972d-9ba9cf34ddfd', N'411ea931-cbe2-4f73-9b9d-f88873b26da6', N'e822bfb4-b016-4408-bbb5-7690de1754a1', 1, 0, 0,1,GETDATE())
INSERT INTO [dbo].[Role] ([Id], [Name], [Active],[CreatedBy],[CreatedDate]) VALUES (N'e822bfb4-b016-4408-bbb5-7690de1754a1', N'Admin', 1,1,GETDATE())
INSERT INTO [dbo].[Role] ([Id], [Name], [Active],[CreatedBy],[CreatedDate]) VALUES (N'ae44799a-e90a-43a1-8c77-e6b68bf3a9f0', N'Vendor', 1,1,GETDATE())
INSERT INTO [dbo].[Users] ([Id], [Name], [RoleId], [Email], [MobileNo], [UserName], [Password], [IsActive],[CreatedBy],[CreatedDate]) VALUES (N'290f2a36-c518-4fde-b4b6-42e5e477e9b9', N'admin', N'e822bfb4-b016-4408-bbb5-7690de1754a1', N'swa@gmailc.com', N'8787', N'admin', N'admin', 1,1,GETDATE())
INSERT INTO [dbo].[Users] ([Id], [Name], [RoleId], [Email], [MobileNo], [UserName], [Password], [IsActive],[CreatedBy],[CreatedDate]) VALUES (N'afb47173-306f-46ee-90bf-4528017aa77a', N'vendor', N'ae44799a-e90a-43a1-8c77-e6b68bf3a9f0', N'ven@gma.com', N'343', N'vendor', N'vendor', 1,1,GETDATE())

