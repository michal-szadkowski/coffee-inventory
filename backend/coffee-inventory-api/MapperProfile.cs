using API.Data;
using AutoMapper;
using DataAccess.Entities;

namespace API;

public class MapperProfile : Profile
{
    public MapperProfile()
    {
        CreateMap<InventoryItem, InventoryItemDTO>().ReverseMap();
        CreateMap<Usage, UsageDTO>().ReverseMap();
        CreateMap<Brew, BrewDTO>().ReverseMap();
        CreateMap<User, UserDTO>().ReverseMap();
        CreateMap<Payment, PaymentDTO>().ReverseMap();
    }
}