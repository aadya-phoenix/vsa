using MarutiSuzuki.Audit.Contract;
using MarutiSuzuki.Audit.Entity.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MarutiSuzuki.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        public UserController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        // GET: api/<UserController>
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAsync()
        {
            var data = await unitOfWork.Users.GetAllAsync();
            return Ok(data);
           
        }
        [Authorize(Roles = "Vendor")]
        [HttpGet("{id}")]       
        public async Task<IActionResult> GetById(Guid id)
        {
            var data = await unitOfWork.Users.GetByIdAsync(id);
            if (data == null) return Ok();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> Add(User user)
        {
            var data = await unitOfWork.Users.AddAsync(user);
            return Ok(data);
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            var data = await unitOfWork.Users.DeleteAsync(id);
            return Ok(data);
        }
        [HttpPut]
        public async Task<IActionResult> Update(User product)
        {
            var data = await unitOfWork.Users.UpdateAsync(product);
            return Ok(data);
        }
    }
}
