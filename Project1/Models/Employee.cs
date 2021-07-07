using System;
using System.Collections.Generic;

#nullable disable

namespace Project1.Models
{
    public partial class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime BirthDay { get; set; }
        public int Age { get; set; }
        public int EnglishValue { get; set; }
    }
}
