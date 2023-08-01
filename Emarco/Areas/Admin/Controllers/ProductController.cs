using Emarco.data;
using Emarco.Models;
using Emarco.Models.ViewModels;
using Emarco.Repository.IRepository;
using Emarco.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Emarco.Areas.Admin.Controllers
{
    [Area("Admin")]
	[Authorize(Roles = StaticDetails.Role_Admin)]

	public class ProductController : Controller
    {
       

        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _hostEnvironment ;
        public ProductController(IUnitOfWork unitOfWork , IWebHostEnvironment hostEnvironment) //IWebHostEnvironment for files
        {
            _unitOfWork = unitOfWork;
            _hostEnvironment = hostEnvironment;   
        }

        public IActionResult Index()
        {

            return View();
        }




        //GET
        public IActionResult Upsert(int? id)
        {
            //need to upload view model in dropdown
            ProductVM productVM = new()
            {
                Product = new(),

                CategoryListItem = _unitOfWork.Category.GetAll().Select(
                     u => new SelectListItem
                     {
                         Text = u.Name,
                         Value = u.Id.ToString()
                     }),

                CoverTypeListItem = _unitOfWork.CoverType.GetAll().Select(
                       u => new SelectListItem
                       {
                           Text = u.Name,
                           Value = u.Id.ToString(),
                       }),

            };

            if (id == null || id == 0)
            {
                //create Product
               // ViewBag.CategoryListItem = CategoryListItem;
                //ViewData["CoverTypeListItem"] = CoverTypeListItem;
                return View(productVM);

            }

            else
            {
                //update Product
                productVM.Product=_unitOfWork.Product.GetFirstOrDefault(u=>u.Id == id);
                return View(productVM);
            }

        


        }

        //POST
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Upsert(ProductVM obj , IFormFile? fileImage)
        {
           
            
            if (ModelState.IsValid)
            {
                //Apload Images

                string wwwRootPath = _hostEnvironment.WebRootPath;
                if (fileImage != null)
                {
                    string fileName = Guid.NewGuid().ToString();
                    var aploads = Path.Combine(wwwRootPath, @"images\products");
                    var extension = Path.GetExtension(fileImage.FileName);
                        
                    //delet old imageUrl
                    if (obj.Product.ImageUrl !=null)
                    {
                        var oldImagePath = Path.Combine(wwwRootPath, obj.Product.ImageUrl.TrimStart('\\'));
                        if (System.IO.File.Exists(oldImagePath))
                        {
                            System.IO.File.Delete(oldImagePath);
                        }
                    }

                    //coppy the file in to location
                    using (var fileStreams = new FileStream(Path.Combine(aploads, fileName + extension), FileMode.Create))
                    {
                        fileImage.CopyTo(fileStreams);
                    }
                    obj.Product.ImageUrl = @"\images\products\" + fileName + extension;
                }

                if (obj.Product.Id ==0)
                {
                    _unitOfWork.Product.Add(obj.Product);
                }
                else
                {
                    _unitOfWork.Product.Update(obj.Product);
                }
                _unitOfWork.Save();
                TempData["success"] = "Product is ceated successfully";
                return RedirectToAction("Index");
            }
            return View(obj);
        }


        #region API CALLS
        [HttpGet]
        public IActionResult GetAll()
        {
            var ProductList = _unitOfWork.Product.GetAll(includeProperties:"Category,CoverType");

            return Json(new { data = ProductList});
            
        }

        //POST
        [HttpDelete]
        public IActionResult Delete(int? id)
        {
            //var obj = _db.Categories.Find(id);
            var obj = _unitOfWork.Product.GetFirstOrDefault(u => u.Id == id);
            if (obj == null)
            {
                return Json(new { success = false, message = "Error while deleting" });
            }

            var oldImagePath = Path.Combine(_hostEnvironment.WebRootPath, obj.ImageUrl.TrimStart('\\'));

            if (System.IO.File.Exists(oldImagePath))
            {
                System.IO.File.Delete(oldImagePath);
            }

            _unitOfWork.Product.Remove(obj);
            _unitOfWork.Save();
            return Json(new { success = true, message = "Delete Successful" });


        }
        #endregion
    }

}
