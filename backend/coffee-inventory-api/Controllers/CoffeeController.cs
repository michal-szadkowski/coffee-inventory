using API.Data;
using AutoMapper;
using DataAccess.Entities;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class CoffeeController : ControllerBase
{
    private IRepository<Coffee> coffeeRepo;
    private IMapper mapper;

    public CoffeeController(IRepository<Coffee> repository, IMapper mapper)
    {
        this.coffeeRepo = repository;
        this.mapper = mapper;
    }

    [HttpGet]
    [Route("all")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<CoffeeDTO[]>> GetAll()
    {
        return mapper.Map<CoffeeDTO[]>(await coffeeRepo.GetAll());
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<CoffeeDTO>> Create(CoffeeDTO coffee)
    {
        var result = await coffeeRepo.Create(mapper.Map<Coffee>(coffee));
        if (result == null)
            return BadRequest();
        return mapper.Map<CoffeeDTO>(result);
    }

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CoffeeDTO>> Delete(string id)
    {
        var result = await coffeeRepo.Delete(id);
        return result != null ? mapper.Map<CoffeeDTO>(result) : BadRequest();
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CoffeeDTO>> Update(CoffeeDTO coffee)
    {
        var result = await coffeeRepo.Update(mapper.Map<Coffee>(coffee));
        return result != null ? mapper.Map<CoffeeDTO>(result) : BadRequest();
    }
}
