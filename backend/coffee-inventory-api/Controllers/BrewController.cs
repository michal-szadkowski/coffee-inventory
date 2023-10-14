using API.Data;
using AutoMapper;
using DataAccess;
using DataAccess.Entities;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class BrewController : ControllerBase
{
    private IRepository<Brew> brewRepo;
    private IMapper mapper;

    public BrewController(IRepository<Brew> repository, IMapper mapper)
    {
        this.brewRepo = repository;
        this.mapper = mapper;
    }

    [HttpGet]
    [Route("all")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<BrewDTO[]>> GetAll()
    {
        var result = await brewRepo.GetAll();
        return mapper.Map<BrewDTO[]>(result);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<BrewDTO>> Create(BrewDTO brew)
    {
        if (brew.Usage.All(x => ObjectIdValidator.IsValid(x.ItemId)))
        {
            var result = await brewRepo.Create(mapper.Map<Brew>(brew));
            return mapper.Map<BrewDTO>(result);
        }
        return BadRequest();
    }

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<BrewDTO>> Delete(string id)
    {
        var result = await brewRepo.Delete(id);
        return result != null ? mapper.Map<BrewDTO>(result) : BadRequest();
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<BrewDTO>> Update(BrewDTO brew)
    {
        if (brew.Usage.All(x => ObjectIdValidator.IsValid(x.ItemId)))
        {
            var result = await brewRepo.Update(mapper.Map<Brew>(brew));
            return mapper.Map<BrewDTO>(result);
        }
        return BadRequest();
    }
}
