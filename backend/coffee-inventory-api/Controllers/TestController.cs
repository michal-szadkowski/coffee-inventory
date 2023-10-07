using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace coffee_inventory_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public Test Get()
        {
            return new Test();
        }
    }

    public class Test
    {
        public string TestField { get; set; } = "Test";
    }
}
