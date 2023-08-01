using Emarco.Repository.IRepository;
using Emarco.Utility;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Emarco.ViewComponents
{
    public class ShoppingCartViewComponent : ViewComponent
    {
        private readonly IUnitOfWork _unitOfWork;

        public ShoppingCartViewComponent(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


   



        public async Task<IViewComponentResult> InvokeAsync()
        {
            // cheking if user Loging and bring the session 
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var claim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
            if (claim != null)
            {
                if (HttpContext.Session.GetInt32(StaticDetails.SessionCart) != null)
                {
                    return View(HttpContext.Session.GetInt32(StaticDetails.SessionCart));
                }
                else
                {
                    HttpContext.Session.SetInt32(StaticDetails.SessionCart,
                        _unitOfWork.ShoppingCart.GetAll(u => u.ApplicationUserId == claim.Value).ToList().Count);
                    return View(HttpContext.Session.GetInt32(StaticDetails.SessionCart));
                }
            }
            else
            {
                HttpContext.Session.Clear();
                return View(0);
            }

        }
    }

}
