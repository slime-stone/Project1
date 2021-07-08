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

    }
}
