using System.Net;
using DataAccess;
using DataAccess.Entities;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("inventory/other")]
public class OtherItemController : ControllerBase
{
    private IRepository<OtherItem> otherItemRepository;

    public OtherItemController(IRepository<OtherItem> otherItemRepository)
    {
        this.otherItemRepository = otherItemRepository;
    }

    [HttpGet]
    [Route("all")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<List<OtherItem>> GetAll()
    {
        return await otherItemRepository.GetAll();
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<OtherItem>> Create(OtherItem coffeePack)
    {
        return await otherItemRepository.Create(coffeePack);
    }

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<OtherItem>> Delete(string id)
    {
        var result = await otherItemRepository.Delete(id);
        return result != null ? result : BadRequest();
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<OtherItem>> Update(OtherItem coffeePack)
    {
        var result = await otherItemRepository.Update(coffeePack);
        return result != null ? result : BadRequest();
    }
}
