using API.Data;
using AutoMapper;
using DataAccess;
using DataAccess.Entities;
using DataAccess.Repositories;

namespace API.Services;

public class PaymentService
{
    private IRepository<Payment> paymentRepo;
    private IRepository<User> userRepo;
    private IMapper mapper;

    public PaymentService(
        IRepository<Payment> paymentRepo,
        IRepository<User> userRepo,
        IMapper mapper
    )
    {
        this.paymentRepo = paymentRepo;
        this.userRepo = userRepo;
        this.mapper = mapper;
    }

    public async Task<PaymentDTO[]> GetAll()
    {
        var result = await paymentRepo.GetAll();
        return mapper.Map<List<PaymentDTO>>(result).ToArray();
    }

    public async Task<PaymentDTO?> Create(PaymentDTO item)
    {
        if ((await userRepo.Get(item.UserId)) != null)
        {
            var result = await paymentRepo.Create(mapper.Map<Payment>(item));
            return mapper.Map<PaymentDTO>(result);
        }
        return null;
    }

    public async Task<PaymentDTO?> Delete(string id)
    {
        var result = await paymentRepo.Delete(id);
        return mapper.Map<PaymentDTO>(result);
    }

    public async Task<PaymentDTO?> Update(PaymentDTO item)
    {
        ObjectIdValidator.IsValid(item.UserId);
        var result = await paymentRepo.Update(mapper.Map<Payment>(item));
        return mapper.Map<PaymentDTO>(result);
    }
}
