using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using paging.Models;
using paging.Utility;
namespace paging.Controllers
{
    public class HomeController : Controller
    {
        database1Entities db = new database1Entities();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult getAllEmployee()
        {

            return View();
        }
        public JsonResult getAll()
        {
            var list = db.tbemployes.ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getById(int id)
        {
            var Id = Convert.ToInt32(id);
            var EmpId = db.tbemployes.Find(Id);
            return Json(EmpId, JsonRequestBehavior.AllowGet);
        }














        //public JsonResult GetEmployeee(string search, int currentPage, int recordsPerPage)
        //{
        //    var Search = search;
        //    var pageNumber = currentPage;
        //    var pageSize = recordsPerPage;
        //    var begin = (pageNumber - 1) * pageSize;

        //    var totalNumberOfRecords = db.tbemployes.Count();
        //    if (Search == "undefined" || Search == "")
        //    {
        //        var employee = db.tbemployes.OrderBy(r => r.Id).Skip(begin).Take(pageSize).ToList();
        //        var employeesContainer = new { Employee = employee, recordCount = totalNumberOfRecords };
        //        return Json(employeesContainer, JsonRequestBehavior.AllowGet);
        //    }
        //    else
        //    {
        //        //var employee = db.tbemployes.Where((r => r.Name.Contains(Search)) ).OrderBy(r => r.Name).Skip(begin).Take(pageSize).ToList();
        //        var employee = db.tbemployes.Where((r => r.Name.Contains(Search) || r.Email.Contains(Search))).OrderBy(r => r.Name).Skip(begin).Take(pageSize).ToList();

        //        var employeesContainer = new { Employee = employee, recordCount = totalNumberOfRecords };
        //        return Json(employeesContainer, JsonRequestBehavior.AllowGet);
        //    }
        //}
        public JsonResult GetEmployeee(string search, int currentPage, int recordsPerPage)
        {
            var pageNumber = currentPage;
            var pageSize = recordsPerPage;
            var begin = (pageNumber - 1) * pageSize;
            var totalNumberOfRecords = 0;
            var Search = search;
            if (!string.IsNullOrEmpty(search) && search != "undefined")
            {
                var employee = db.tbemployes.Where(x => x.Name.Contains(Search.ToLower()) || x.Email.Contains(Search)).OrderBy(r => r.Id).Skip(begin).Take(pageSize).ToList();
               var count = db.tbemployes.Where(x => x.Name.Contains(Search.ToLower()) || x.Email.Contains(Search)).Count();
                totalNumberOfRecords = count;
                var employeesContainer = new { Employee = employee, recordCount = totalNumberOfRecords };
                return Json(employeesContainer, JsonRequestBehavior.AllowGet);
            }
            else
            {
               var  employee = db.tbemployes.OrderBy(r => r.Id).Skip(begin).Take(pageSize).ToList();
                totalNumberOfRecords = db.tbemployes.Count();
                var employeesContainer = new { Employee = employee, recordCount = totalNumberOfRecords };
                return Json(employeesContainer, JsonRequestBehavior.AllowGet);
            }
        }
    }
}