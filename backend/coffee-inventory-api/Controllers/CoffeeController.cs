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
    public async Task<List<Coffee>> GetAll()
    {
        return await coffeeRepo.GetAll();
    }

    [HttpPost]
    public async Task<Coffee> Create(Coffee coffee)
    {
        return await coffeeRepo.Create(coffee);
    }

    [HttpDelete]
    public async Task<Coffee> Delete(string id)
    {
        return await coffeeRepo.Delete(id);
    }

    [HttpPut]
    public async Task<Coffee> Update(Coffee coffee)
    {
        return await coffeeRepo.Update(coffee);
    }
}
