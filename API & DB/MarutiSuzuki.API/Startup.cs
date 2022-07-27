
using AutoMapper;
using DinkToPdf;
using DinkToPdf.Contracts;
using MarutiSuzuki.API.Container;
using MarutiSuzuki.Audit.ExceptionHandling;
using MarutiSuzuki.Audit.Model.Models.Email;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.Negotiate;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
namespace MarutiSuzuki.API
{
    public class Startup
    {
        readonly IHostingEnvironment HostingEnvironment;
        public IConfigurationRoot Configuration { get; }
        internal static TokenValidationParameters tokenParam;
        public Startup(IHostingEnvironment env)
        {
            HostingEnvironment = env;
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddAutoMapper(typeof(Startup).Assembly);

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton(Configuration); //IConfigurationRoot
            services.AddSingleton<IConfiguration>(Configuration);
            services.AddOptions();
            //services.Configure<Settings>(Configuration.GetSection("Settings"));

            string str = Configuration.GetConnectionString("SQLEntityApiConnection");
            string enableDomain = Configuration["AllowDomainForCors"];

          
            DIContainer.SqlContainer.Injector(services);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //tokenParam = new TokenValidationParameters
            //{
            //    ValidateIssuerSigningKey = true,
            //    ValidIssuer = Configuration["JWT:Issuer"],
            //    ValidateLifetime = true,
            //    IssuerSigningKey = creds.Key,
            //    ValidAudience = Configuration["JWT:Audience"],
            //    ValidateAudience = true,
            //    //RequireSignedTokens = true,
            //    ClockSkew = TimeSpan.FromMinutes(30)

            //};
           

            services.AddCors(options =>
            {
                options.AddPolicy(name: "MyAllowSpecificOrigins",
                                  builder =>
                                  {
                                      builder.WithOrigins(enableDomain);
                                  });
            });
           
            services.AddMvc(options =>
                {
                    //Add Exception filter
                    //options.Filters.Add(new AsyncActionFilter(new LoginBusiness(new UnitOfWork(new SuzukiDBContext()))));
                    options.Filters.Add(new CustomExceptionFilter());
                    options.EnableEndpointRouting = false;

                });
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = creds.Key,
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));
            var emailConfig = Configuration
               .GetSection("EmailConfiguration")
               .Get<EmailConfiguration>();
            services.Configure<FormOptions>(o =>
            {
                o.ValueLengthLimit = int.MaxValue;
                o.MultipartBodyLengthLimit = int.MaxValue;
                o.MemoryBufferThreshold = int.MaxValue;
            });
            services.AddSingleton(emailConfig);
            services.AddSwaggerGen(c =>
            {
                //c.SwaggerDoc("v1", new Info { Title = "Maruti Suzuki API", Version = "v1" });
                //c.CustomSchemaIds(x => x.FullName);
                //c.AddSecurityDefinition("Bearer",
                //       new ApiKeyScheme
                //       {
                //           In = "header",
                //           Description = "Please enter into field the word 'Bearer' following by space and JWT",
                //           Name = "Authorization",
                //           Type = "apiKey"
                //       });
                //c.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>> {
                //    { "Bearer", Enumerable.Empty<string>() } });


            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            //Addded middleware to handel API exception
            app.UseMiddleware(typeof(ErrorHandlingMiddleware));

            app.UseStaticFiles();
            app.UseCors("MyAllowSpecificOrigins");
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseMvc();


            app.Use(async (context, next) =>
            {
                context.Response.Headers.Add("Header-Name", "Header-Value");
                await next();
            });

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Maruti Suzuki API V1");
                c.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
            });
            //app.UseSwagger();
            //app.UseSwaggerUI(c =>
            //{
            //	c.SwaggerEndpoint("http://localhost/MarutiSuzukiAPI/swagger/v1/swagger.json", "Maruti Suzuki API V1");

            //	c.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
            //});

        }
    }
}
