using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskMenagerJWT.Model
{
    public class UserTask
    {
        public int Id { get; set; }
        public string TaskName { get; set; }
        public DateTime TaskDate { get; set; }
        public string TaskStatus { get; set; }
        public string UserName {get; set;}
        public List<string> TaskFiles { get; set; }
    }
}
