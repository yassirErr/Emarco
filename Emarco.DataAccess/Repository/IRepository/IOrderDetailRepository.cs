using Emarco.Models;

namespace Emarco.Repository.IRepository
{

	public interface IOrderDetailRepository : IRepository<OrderDetail>
	{
		void Update(OrderDetail obj);
	}
}
