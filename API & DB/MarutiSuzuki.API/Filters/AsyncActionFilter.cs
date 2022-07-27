using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MarutiSuzuki.API.Filters
{
    public class AsyncActionFilter : IAsyncActionFilter
    {
        //private readonly ILoginBusiness iLoginBusiness;
        //private string Token = string.Empty;

        //public AsyncActionFilter(ILoginBusiness IloginBusiness)
        //{
        //    iLoginBusiness = IloginBusiness;
        //}

        //public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        //{
        //    // execute any code before the action executes
        //    if ((string)context.RouteData.Values["Controller"] != "Token")
        //    {
        //        Token = ((Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http.HttpRequestHeaders)((Microsoft.AspNetCore.Http.Internal.DefaultHttpRequest)context.HttpContext.Request).Headers).HeaderAuthorization.ToString();
        //        var userModel = TokenDecode(Token.Replace("Bearer ", ""));
        //        if (CheckToken(userModel.Name))
        //        {
        //            var result = await next();
        //        }
        //        else
        //        {
        //            // context.Result = new JsonResult(new { HttpStatusCode.Unauthorized });//new UnauthorizedObjectResult($"User {userModel.FullName.Split(' ')[0]} logout");
        //            var bytes = Encoding.UTF8.GetBytes($"User {userModel.Name} logout");
        //            context.HttpContext.Response.StatusCode = 401;
        //            await context.HttpContext.Response.Body.WriteAsync(bytes, 0, bytes.Length);
        //            return;
        //        }
        //    }
        //    else
        //    {
        //        var result = await next();

        //    }

        //    // execute any code after the action executes
        //}
        //private bool CheckToken(string userName)
        //{
        //    var result = iLoginBusiness.GetLoginDetailByUserName(userName).Result;
        //    if (result[0].Token == Token.Replace("Bearer ", ""))
        //    {
        //    }
        //    else
        //    {
        //        return false;
        //    }
        //    return true;
        //}

        //public UserModel TokenDecode(string Token)
        //{
        //    UserModel objLoggedInUser = new UserModel();

        //    if (!string.IsNullOrEmpty(Token))
        //    {
        //        InterServiceApiCall._accessToken = Token;
        //        objLoggedInUser.Role = new Audit.Entity.Model.UserRole();
        //        var handler = new JwtSecurityTokenHandler();
        //        var token = handler.ReadJwtToken(Token);
        //        var claims = token.Claims;
        //        foreach (var variable in claims)
        //        {
        //            var cType = variable.Type;
        //            var cValue = variable.Value;
        //            switch (cType)
        //            {
        //                case "FullName":
        //                    objLoggedInUser.FullName = cValue;
        //                    break;
        //                case "Name":
        //                    objLoggedInUser.Name = cValue;
        //                    break;
        //                case "IsActive":
        //                    objLoggedInUser.IsActive = true;
        //                    break;
        //                case "ImagePath":
        //                    objLoggedInUser.ImagePath = cValue;
        //                    break;
        //                case "RoleName":
        //                    objLoggedInUser.Role.RoleName = cValue;
        //                    break;
        //                case "RoleId":
        //                    objLoggedInUser.Role.RoleId = Guid.Parse(cValue);
        //                    break;
        //                case "CountryId":
        //                    if (!string.IsNullOrEmpty(cValue))
        //                        objLoggedInUser.CountryId = Guid.Parse(cValue);
        //                    break;
        //                case "DistributerId":
        //                    if (!string.IsNullOrEmpty(cValue))
        //                        objLoggedInUser.DistributerId = Guid.Parse(cValue);
        //                    break;
        //                case "WorkshopId":
        //                    if (!string.IsNullOrEmpty(cValue))
        //                        objLoggedInUser.WorkshopId = Guid.Parse(cValue);
        //                    break;
        //                case "MsilId":
        //                    if (!string.IsNullOrEmpty(cValue))
        //                        objLoggedInUser.MsilId = Guid.Parse(cValue);
        //                    break;
        //                case "WorkshopLocationId":
        //                    if (!string.IsNullOrEmpty(cValue))
        //                        objLoggedInUser.WorkshopLocationId = Guid.Parse(cValue);
        //                    break;
        //            }
        //        }

        //    }
        //    return objLoggedInUser;
        //}
        public Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            throw new NotImplementedException();
        }
    }
}
