using Emarco.data;
using Emarco.Models;
using Emarco.Repository.IRepository;

namespace Emarco.Repository
{
    public class ShoppingCartRepository : Repository<ShoppingCart>, IShoppingCartRepository
    {
        private ApplicationDbContext _db;
      
        public ShoppingCartRepository(ApplicationDbContext db):base(db)
        {
            _db = db;
        }

        public int DecrementCount(ShoppingCart ShoppingCart, int count)
        {
           ShoppingCart.Count -= count;
           return ShoppingCart.Count;
        }

        public int IncrementCount(ShoppingCart ShoppingCart, int count)
        {
            ShoppingCart.Count += count;
            return ShoppingCart.Count; ;
        }
    }
}
