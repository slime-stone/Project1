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
        public string Post(Employee updEmp)
        {
            Employee findEmp = Array.Find(db.Employees.ToArray<Employee>(), (Employee t) => t.Id == updEmp.Id);
            if(findEmp != null)
            {
                findEmp.Name = updEmp.Name;
                findEmp.Surname = updEmp.Surname;
                findEmp.BirthDay = updEmp.BirthDay;
                findEmp.Age = updEmp.Age;
                findEmp.EnglishValue = updEmp.EnglishValue;
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
