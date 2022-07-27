using Dapper;
using MarutiSuzuki.Audit.Entity.Model;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarutiSuzuki.Audit.Repository.SQLRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration configuration; 
        public UserRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public async Task<int> AddAsync(User entity)
        {
            //entity.AddedOn = DateTime.Now;
            var sql = "Insert into Users (Name,RoleId,Email,MobileNo) VALUES (@Name,@RoleId,@Email,@MobileN)";
            using (var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection")))
            {
                connection.Open();
                var result = await connection.ExecuteAsync(sql, entity);
                return result;
            }
        }
        public async Task<int> DeleteAsync(Guid id)
        {
            var sql = "DELETE FROM Users WHERE Id = @Id";
            using (var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection")))
            {
                connection.Open();
                var result = await connection.ExecuteAsync(sql, new { Id = id });
                return result;
            }
        }
        public async Task<IReadOnlyList<User>> GetAllAsync()
        {
            var sql = "SELECT * FROM Users";
            using (var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection")))
            {
                connection.Open();
                var result = await connection.QueryAsync<User>(sql);
                return result.ToList();
            }
        }
        public async Task<User> GetByIdAsync(Guid id)
        {
            var sql = "SELECT * FROM Users WHERE Id = @Id";
            using (var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection")))
            {
                connection.Open();
                var result = await connection.QuerySingleOrDefaultAsync<User>(sql, new { Id = id });
                return result;
            }
        }
        public async Task<int> UpdateAsync(User entity)
        {
            //entity.ModifiedOn = DateTime.Now;
            var sql = "UPDATE Users SET Name = @Name WHERE Id = @Id";
            using (var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection")))
            {
                connection.Open();
                var result = await connection.ExecuteAsync(sql, entity);
                return result;
            }
        }
    }
}

