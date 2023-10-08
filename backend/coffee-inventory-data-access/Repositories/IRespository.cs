namespace DataAccess.Repositories;

public interface IRepository<T>
{
    Task<T> Get(string id);
    Task<List<T>> GetAll();

    Task<T> Create(T item);
    Task<T> Update(T item);
    Task<T> Delete(string id);
}
