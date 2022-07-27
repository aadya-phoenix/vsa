using MarutiSuzuki.Audit.Contract.Business;
using MarutiSuzuki.Audit.Entity.Model;
using MarutiSuzuki.Audit.Model.Models.Login;
using MarutiSuzuki.Audit.Model.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static MarutiSuzuki.Audit.Common.Constants;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MarutiSuzuki.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class TokenController : ControllerBase
    {
        private ILoginBusiness _Login;
        private IConfiguration _config;
        public TokenController(IConfiguration config,ILoginBusiness login)
        {
            _Login = login;
            _config = config;
        }      
        // GET: api/<ValuesController>
        [HttpPost]
        public IActionResult Token([FromBody] LoginModel login)
        {
            try
            {
                IActionResult response = Unauthorized();
                var user = Authenticate(login);

                if (user != null)
                {
                    if (user.Name == login.Username && user.Password == login.Password)
                    {
                        var tokenString = BuildToken(user);
                        response = Ok(new { token = tokenString });
                    }
                    else
                    {
                        //return Unauthorized();
                        throw new UnauthorizedAccessException(KeyConstant.UnauthorizedAccess);
                    }
                }
                else
                {
                    //return Unauthorized();
                    throw new UnauthorizedAccessException(KeyConstant.UnauthorizedAccess);
                }
                return response;
            }
            catch (Exception ex)
            {


                switch (ex.Message)
                {
                    case KeyConstant.UnauthorizedAccess:
                        throw new UnauthorizedAccessException(KeyConstant.UnauthorizedAccess);
                    case KeyConstant.InvalidAccessToken:
                        throw new UnauthorizedAccessException(KeyConstant.InvalidAccessToken);
                    default:
                        throw new UnauthorizedAccessException(KeyConstant.InternalServerError, ex);
                }
            }
        }

        private string BuildToken(UserModel user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Name.ToString()),
                    new Claim("Name",user.Name),
                    new Claim("FullName", string.IsNullOrEmpty(user.FullName) ? "" : user.FullName.ToString()),
                    new Claim(ClaimTypes.Name, user.Role.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role.Name)
                }),
                Expires = DateTime.Now.AddMinutes(int.Parse(_config["ExpiryTimeInMin"])),
                SigningCredentials = new SigningCredentials(creds.Key, SecurityAlgorithms.HmacSha256Signature)
            };
           
            var token = new JwtSecurityTokenHandler().CreateToken(tokenDescriptor);
            var str = new JwtSecurityTokenHandler().WriteToken(token);
           
            return str;
        }

        private UserModel Authenticate(LoginModel login)
        {
            UserModel user = null;
            List<LoginRoleViewModel> loginDetails = _Login.GetLoginDetails(login.Username).Result; 

            var validUser = loginDetails.Where(p => p.UserName.ToLower() == login.Username.ToLower() && p.Password.ToLower() == login.Password.ToLower()).ToList();

            if (validUser.Count() > 0)
            {               
                user = new UserModel { Password = validUser[0].Password,  Name = validUser[0].UserName, Role = new Role { Id = validUser[0].RoleId, Name = validUser[0].RoleName } };              
            }
            else
            {
                var validUse1r = loginDetails.Where(p => p.UserName.ToLower() == login.Username.ToLower()).ToList();
                user = new UserModel { Password = validUse1r[0].Password, Name = validUse1r[0].UserName, Role = new Role { Id = validUse1r[0].RoleId, Name = validUse1r[0].RoleName } };
            }

            return user;
        }


    }
}
