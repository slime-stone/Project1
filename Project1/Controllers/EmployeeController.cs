using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Project1.Models;
using System.Linq;
using System.Collections.Generic;
using System;

namespace Project1.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private TestDBContext db;

        public EmployeeController(TestDBContext context)
        {
            db = context;
        }

        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            return db.Employees.ToList();
        }

        [HttpPost]
        public string Post(int Id, string Name, string Surname, string BirthDay, int Age, int EnglishValue)
        {
            Employee findEmp = db.Employees.Find(Id);
            if(findEmp != null)
            {
                findEmp.Name = Name;
                findEmp.Surname = Surname;
                findEmp.BirthDay = Convert.ToDateTime(BirthDay);
                findEmp.Age = Age;
                findEmp.EnglishValue = EnglishValue;
                db.SaveChanges();
                return "Ok";
            }
            else
            {
                return "Bad";
            }
        }

    }
}
