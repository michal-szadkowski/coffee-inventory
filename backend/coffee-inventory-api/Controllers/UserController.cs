using API.Data;
using AutoMapper;
using DataAccess.Entities;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IMapper mapper;
    private readonly IRepository<User> userRepo;

    public UserController(IRepository<User> userRepo, IMapper mapper)
    {
        this.userRepo = userRepo;
        this.mapper = mapper;
    }

    [HttpGet]
    [Route("all")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<UserDTO[]>> GetAll()
    {
        return mapper.Map<UserDTO[]>(await userRepo.GetAll());
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<UserDTO>> Create(UserDTO item)
    {
        var result = await userRepo.Create(mapper.Map<User>(item));
        return mapper.Map<UserDTO>(result);
    }

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<UserDTO>> Delete(string id)
    {
        var result = await userRepo.Delete(id);
        return result != null ? mapper.Map<UserDTO>(result) : BadRequest();
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<UserDTO>> Update(UserDTO item)
    {
        var result = await userRepo.Update(mapper.Map<User>(item));
        return result != null ? mapper.Map<UserDTO>(result) : BadRequest();
    }
}