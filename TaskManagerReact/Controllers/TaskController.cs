using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using TaskMenagerJWT.Model;

namespace TaskMenagerJWT.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TaskController : Controller
    {
        ApplicationContext db;
        UserContext userDb;
        private IWebHostEnvironment _env;
        public TaskController(ApplicationContext context, UserContext userContext, IWebHostEnvironment env)
        {
            _env = env;
            db = context;
            userDb = userContext;
        }
        [Authorize]
        [HttpPost]
        [Route("all")]
        public IEnumerable<UserTask> Get(Name username)
        {
            return db.Tasks.Where(x => x.UserName == username.Username).ToList();
        }

        [Authorize]
        [HttpGet("{id}")]
        public UserTask Get(int id)
        {
            UserTask UserTask = db.Tasks.FirstOrDefault(x => x.Id == id);
            return UserTask;
        }

        [Authorize]
        [HttpPost]
        [Route("upload")]
        public async Task<IActionResult> UploadFile()
        {
            var files = Request.Form.Files;


            foreach (var file in files)
            {
                var filename = file.FileName;

                var savePath = Path.Combine(_env.ContentRootPath, "uploads", filename);

                using (var fileStream = new FileStream(savePath, FileMode.Create))
                {
                    await file.OpenReadStream().CopyToAsync(fileStream);
                }
            }
            return Ok();
        }

        [Authorize]
        [HttpPost]
        [Route("download")]
        public FileResult DownloadFile(Data data)
        {
            Console.WriteLine(data.FileName);
            string fileType = "application/pdf";
            var downloadPath = Path.Combine(_env.ContentRootPath, "uploads", data.FileName);
            byte[] mas = System.IO.File.ReadAllBytes(downloadPath);
            return File(mas, fileType, data.FileName);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post(UserTask UserTask)
        {
            if (ModelState.IsValid)
            {
                db.Tasks.Add(UserTask);
                db.SaveChanges();
                return Ok(UserTask);
            }
            return BadRequest(ModelState);
        }

        [Authorize]
        [HttpPut]
        public IActionResult Put(UserTask UserTask)
        {
            if (ModelState.IsValid)
            {
                db.Update(UserTask);
                db.SaveChanges();
                return Ok(UserTask);
            }
            return BadRequest(ModelState);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            UserTask UserTask = db.Tasks.FirstOrDefault(x => x.Id == id);
            if (UserTask != null)
            {
                db.Tasks.Remove(UserTask);
                db.SaveChanges();
            }
            return Ok(UserTask);
        }
    }

}
