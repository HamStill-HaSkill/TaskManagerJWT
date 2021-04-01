using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using TaskMenagerJWT.Model;
using Microsoft.AspNetCore.Http;
using System.Security.Cryptography;
using System.Text;

namespace TaskMenagerJWT.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class AccountController : Controller
    {
        private UserContext db;
        public AccountController(UserContext context)
        {
            db = context;
        }

        [HttpPost]
        [Route("token")]
        public IActionResult Token(User user)
        {
            var identity = GetIdentity(user.Username, user.Password);
            if (identity == null)
            {
                //HttpContext.Response.Cookies.Delete(".AspNetCore.Application.Id");
                return StatusCode(401);
            }

            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name
            };
            HttpContext.Response.Cookies.Append(".AspNetCore.Application.Id", encodedJwt,
            new CookieOptions
            {
                MaxAge = TimeSpan.FromMinutes(60)
            });

            return Json(response);
        }

        [HttpGet]
        [Route("logout")]
        public IActionResult Logout()
        {
            HttpContext.Response.Cookies.Delete(".AspNetCore.Application.Id");
            return Ok();
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register(User user)
        {
            user.Password = GetHash(user.Password);
            if (ModelState.IsValid)
            {
                db.Users.Add(user);
                db.SaveChanges();
                return Ok(user);
            }
            return BadRequest(ModelState);
        }


        private ClaimsIdentity GetIdentity(string username, string password)
        {
            password = GetHash(password);
            User user = db.Users.FirstOrDefault(x => x.Username == username && x.Password == password);
            if (user != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Username),
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }
        public string GetHash(string input)
        {
            var md5 = MD5.Create();
            var hash = md5.ComputeHash(Encoding.UTF8.GetBytes(input));

            return Convert.ToBase64String(hash);
        }
    }
}