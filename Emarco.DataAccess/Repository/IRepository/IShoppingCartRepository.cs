using Emarco.Models;

namespace Emarco.Repository.IRepository
{
    public interface IShoppingCartRepository : IRepository<ShoppingCart>
    {
     int IncrementCount(ShoppingCart ShoppingCart , int count);
     int DecrementCount(ShoppingCart ShoppingCart , int count);
    }
}
