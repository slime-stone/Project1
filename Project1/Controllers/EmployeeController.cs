using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Project1.Models;
using System.Linq;
using System.Collections.Generic;

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

        [HttpPost("{Emp?}")]
        public string Set(Employee? NewEmp)
        {
            if (NewEmp != null)
            {
                db.Employees.Add(NewEmp);
                db.SaveChanges();
                return "Employee added";
            }
            return "Employee is not found";
            
        }

        [HttpDelete("{Emp?}")]
        public string Del(Employee? DelEmp)
        {
            if(DelEmp != null)
            {
                db.Employees.Remove(DelEmp);
                db.SaveChanges();
                return "Employee deleted";
            }
            return "Employee is not found";           
        }

        [HttpPut("{Emp?}")]
        public string Update(Employee? Emp)
        {
            if (Emp != null)
            {
                ;
                db.Employees.Remove(Emp);
                db.SaveChanges();
                return "Employee deleted";
            }
            return "Employee is not found";
        }
    }
}
