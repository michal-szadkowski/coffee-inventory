using DataAccess.Entities;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class CoffeeController : ControllerBase
{
    private IRepository<Coffee> coffeeRepo;

    public CoffeeController(IRepository<Coffee> repository)
    {
        this.coffeeRepo = repository;
    }

    [HttpGet]
    [Route("all")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<List<Coffee>> GetAll()
    {
        return await coffeeRepo.GetAll();
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<Coffee> Create(Coffee coffee)
    {
        return await coffeeRepo.Create(coffee);
    }

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Coffee>> Delete(string id)
    {
        var result = await coffeeRepo.Delete(id);
        return result != null ? result : BadRequest();
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Coffee>> Update(Coffee coffee)
    {
        var result = await coffeeRepo.Update(coffee);
        return result != null ? result : BadRequest();
    }
}
