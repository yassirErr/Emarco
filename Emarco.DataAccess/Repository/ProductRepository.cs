using Emarco.data;
using Emarco.Models;
using Emarco.Repository.IRepository;

namespace Emarco.Repository
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private ApplicationDbContext _db;

        public ProductRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Save()
        {
            _db.SaveChanges();
        }

        public void Update(Product obj)
        {
            var objFormDb = _db.Products.FirstOrDefault(u=>u.Id == obj.Id);
            if (objFormDb != null)
            {
                objFormDb.Title = obj.Title;
                objFormDb.Description = obj.Description;
                objFormDb.ISBN = obj.ISBN;
                objFormDb.ListPrice= obj.ListPrice;
                objFormDb.Price = obj.Price;
                objFormDb.Price50 = obj.Price50;
                objFormDb.Price100 = obj.Price100;
                objFormDb.Author = obj.Author;
                objFormDb.CategoryId = obj.CategoryId;
                objFormDb.CoverTypeId = obj.CoverTypeId;

                if (obj.ImageUrl != null)
                {
                    objFormDb.ImageUrl = obj.ImageUrl;
                }

            }
        }
    }
}
