using System.Net;
using DataAccess.Entities;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class CoffeePackController : ControllerBase
{
    private IRepository<Coffee> coffeeRepo;
    private IRepository<CoffeePack> coffeePackRepo;

    public CoffeePackController(
        IRepository<Coffee> coffeeRepository,
        IRepository<CoffeePack> coffeePackRepository
    )
    {
        this.coffeeRepo = coffeeRepository;
        this.coffeePackRepo = coffeePackRepository;
    }

    [HttpGet]
    [Route("all")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<List<CoffeePack>> GetAll()
    {
        return await coffeePackRepo.GetAll();
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CoffeePack>> Create(CoffeePack coffeePack)
    {
        var coffee = await coffeeRepo.Get(coffeePack.CoffeeId);
        if (coffee != null)
            return await coffeePackRepo.Create(coffeePack);
        else
            return BadRequest();
    }

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CoffeePack>> Delete(string id)
    {
        var result = await coffeePackRepo.Delete(id);
        return result != null ? result : BadRequest();
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CoffeePack>> Update(CoffeePack coffeePack)
    {
        var result = await coffeePackRepo.Update(coffeePack);
        return result != null ? result : BadRequest();
    }
}
