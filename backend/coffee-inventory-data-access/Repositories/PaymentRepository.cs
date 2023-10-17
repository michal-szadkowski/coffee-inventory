using DataAccess.Entities;

namespace DataAccess.Repositories;

public class PaymentRepository : BaseRepository<Payment>
{
    public PaymentRepository(MongoAccess mongoAccess)
        : base(mongoAccess, "payments") { }
}
