using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelpers
{
    public class ProductPrams : PaginationParams
    {
        public string OrderBy{get;set;}
        public string searchTerm{get;set;}
        public string Brand{get;set;}
        public string Type{get;set;}
    }
}