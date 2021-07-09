using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project1.Models;

namespace Project1.Models
{
    public class DBInit
    {
        public static void Initialize(TestDBContext context)
        {
            context.Database.EnsureCreated();

            if (context.Employees.Any())
            {
                return;
            }

            var emps = new Employee[]
            {
            new Employee{Id=0,Name="Carson",Surname="Bug",BirthDay=DateTime.Parse("2000-09-01"), Age=20, EnglishValue=89},
            new Employee{Id=1,Name="Igor",Surname="Brom",BirthDay=DateTime.Parse("2000-09-15"), Age=20, EnglishValue=12},
            new Employee{Id=2,Name="Andry",Surname="Ber",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=56},
            new Employee{Id=3,Name="Boris",Surname="Artemov",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=43},
            new Employee{Id=4,Name="Anna",Surname="Dub",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=45},
            new Employee{Id=5,Name="Sergei",Surname="Urokin",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=90},
            new Employee{Id=6,Name="Petr",Surname="Finn",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=65},
            new Employee{Id=7,Name="Ivan",Surname="Finn",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=44},
            new Employee{Id=8,Name="Ekaterina",Surname="Bum",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=54},
            new Employee{Id=9,Name="Anton",Surname="Fedorov",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=66},
            new Employee{Id=10,Name="Sergei",Surname="Alexanderov",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=44},
            new Employee{Id=11,Name="Carson",Surname="Ber",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=37},
            new Employee{Id=12,Name="Vlad",Surname="Urokin",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=75},
            new Employee{Id=13,Name="Pavel",Surname="Alexander",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=90},
            new Employee{Id=14,Name="Vadim",Surname="Urokin",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=21},
            new Employee{Id=15,Name="Carson",Surname="Urokin",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=33},
            new Employee{Id=16,Name="Anton",Surname="Gregorin",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=47},
            new Employee{Id=17,Name="Carson",Surname="Krent",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=89},
            new Employee{Id=18,Name="Igor",Surname="Buk",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=54},
            new Employee{Id=19,Name="Ekaterina",Surname="Arken",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=36},
            new Employee{Id=20,Name="Vlad",Surname="Urokin",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=43},
            new Employee{Id=21,Name="Vadim",Surname="Beshlbnii",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=55},
            new Employee{Id=22,Name="Anton",Surname="Alexander",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=44},
            new Employee{Id=23,Name="Anton",Surname="Nerkin",BirthDay=DateTime.Parse("2005-09-01"), Age=20, EnglishValue=55},
            };

            foreach (Employee e in emps)
            {
                context.Employees.Add(e);
            }
            context.SaveChanges();

            context.SaveChanges();
        }
    }
}
