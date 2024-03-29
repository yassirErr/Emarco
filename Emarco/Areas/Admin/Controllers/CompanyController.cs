﻿using Emarco.data;
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

	public class CompanyController : Controller
    {
       
        private readonly IUnitOfWork _unitOfWork;
        public CompanyController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
  
        }

        public IActionResult Index()
        {

            return View();
        }




        //GET
        public IActionResult Upsert(int? id)
        {
            Company company = new();
  
            if (id == null || id == 0)
            {
                //create company
                return View(company);
            }

            else
            {
                //update company
                company = _unitOfWork.Company.GetFirstOrDefault(u=>u.Id == id);
                return View(company);
            }

        


        }

        //POST
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Upsert(Company obj )
        {
            if (ModelState.IsValid)
            {

                if (obj.Id ==0)
                {
                    _unitOfWork.Company.Add(obj);
                TempData["success"] = "Company is ceated successfully";

            }
            else
                {
                    _unitOfWork.Company.Update(obj);
                TempData["success"] = "Company is updated successfully";

            }
            _unitOfWork.Save();
                return RedirectToAction("Index");
            }
            return View(obj);
        }


        #region API CALLS
        [HttpGet]
        public IActionResult GetAll()
        {
            var CompanyList = _unitOfWork.Company.GetAll();

            return Json(new { data = CompanyList });
            
        }

        //POST
        [HttpDelete]
        public IActionResult Delete(int? id)
        {
            //var obj = _db.Categories.Find(id);
            var obj = _unitOfWork.Company.GetFirstOrDefault(u => u.Id == id);
            if (obj == null)
            {
                return Json(new { success = false, message = "Error while deleting" });
            }

            _unitOfWork.Company.Remove(obj);
            _unitOfWork.Save();
            return Json(new { success = true, message = "Delete Successful" });


        }
        #endregion
    }

}
