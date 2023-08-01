using Emarco.data;
using Emarco.Models;
using Emarco.Repository.IRepository;

namespace Emarco.Repository
{
    public class ApplicationUserRepository : Repository<ApplicationUser>, IApplicationUserRepository
    {
        private ApplicationDbContext _db;
      
        public ApplicationUserRepository(ApplicationDbContext db):base(db)
        {
            _db = db;
        }


    }
}
