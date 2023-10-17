using System.Net;
using API.Data;
using API.Services;
using AutoMapper;
using DataAccess.Entities;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class PaymentController : ControllerBase
{
    private PaymentService paymentService;

    private IMapper mapper;

    public PaymentController(PaymentService paymentService, IMapper mapper)
    {
        this.paymentService = paymentService;
        this.mapper = mapper;
    }

    [HttpGet]
    [Route("all")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<PaymentDTO[]>> GetAll()
    {
        return await paymentService.GetAll();
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<PaymentDTO>> Create(PaymentDTO item)
    {
        var result = await paymentService.Create(item);
        return result != null ? result : BadRequest();
    }

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<PaymentDTO>> Delete(string id)
    {
        var result = await paymentService.Delete(id);
        return result != null ? result : BadRequest();
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<PaymentDTO>> Update(PaymentDTO item)
    {
        var result = await paymentService.Update(item);
        return result != null ? result : BadRequest();
    }
}
