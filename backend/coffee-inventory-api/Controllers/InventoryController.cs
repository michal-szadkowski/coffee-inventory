using System.Net;
using API.Data;
using API.Services;
using AutoMapper;
using DataAccess;
using DataAccess.Entities;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class InventoryController : ControllerBase
{
    private InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService)
    {
        this.inventoryService = inventoryService;
    }

    [HttpGet]
    [Route("all")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<InventoryItemDTO[]>> GetAll()
    {
        return await inventoryService.GetAll();
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<InventoryItemDTO>> Create(InventoryItemDTO item)
    {
        var result = await inventoryService.Create(item);
        return result != null ? result : BadRequest();
    }

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<InventoryItemDTO>> Delete(string id)
    {
        var result = await inventoryService.Delete(id);
        return result != null ? result : BadRequest();
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<InventoryItemDTO>> Update(InventoryItemDTO item)
    {
        var result = await inventoryService.Update(item);
        return result != null ? result : BadRequest();
    }
}
