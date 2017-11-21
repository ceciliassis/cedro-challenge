using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantApi.Data;
using RestaurantApi.Models;
using System.Net.Http;
using System.Net;
using System.Web;

namespace RestaurantApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class DishesController : Controller
    {
        private readonly ManagementContext _context;
        public DishesController(ManagementContext context){
            _context = context;
        }
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Dish dish) {
            if(dish == null) {
                return BadRequest();
            }
            try {
                _context.Dishes.Add(dish);
                await _context.SaveChangesAsync();
                return Ok();
            } catch (DbUpdateException /* ex */) {
                Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                return Json(new { error = "Ocorreu um erro interno, por favor tente novamente."});
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) {
            var dish = await _context.Dishes
                                    .AsNoTracking()
                                    .SingleOrDefaultAsync(
                                        d => d.DishID == id
                                    );
            if(dish == null){
                return NotFound();
            }

            try {
                _context.Dishes.Remove(dish);
                await _context.SaveChangesAsync();
                return Ok();
            } catch (DbUpdateException /* ex */) {
                Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                return Json(new { error = "Ocorreu um erro interno, por favor tente novamente." });
            }
        }


    }
}
