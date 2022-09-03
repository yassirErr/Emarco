using System.Text.Json;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
   
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> 
        GetProducts([FromQuery]ProductPrams productPrams)
        {
            var query=_context.Products
            .Sort(productPrams.OrderBy)
            .Search(productPrams.searchTerm)
            .Filter(productPrams.Brand, productPrams.Type)
            .AsQueryable();
    
          var products = await PagedList<Product>.ToPageList
          (query,productPrams.PageNumber,productPrams.PageSize);

            Response.AddPaginationHeader(products.MetaData);

          return products;

        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Product>>GetProduct(int id)
        {
            return await _context.Products.FindAsync(id);
           
        }
        
        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(p=>p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p=>p.Type).Distinct().ToListAsync();

            return Ok(new {brands, types});
        }
    }
}