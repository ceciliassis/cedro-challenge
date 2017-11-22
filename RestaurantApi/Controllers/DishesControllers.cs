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

        // GET api/dishes
        [HttpGet]
        public async Task<IActionResult> GetAll() {
            var dishes = await _context.Dishes
                                  .Join(_context.Restaurants, 
                                        d => d.RestaurantID, 
                                        r=> r.RestaurantID, 
                                        (d, r) => new {dish = d, rest = r}
                                   ).Select(selectResult => new {
                                        dishID = selectResult.dish.DishID, 
                                        name = selectResult.dish.Name, 
                                        price = selectResult.dish.Price,
                                        restaurantID = selectResult.rest.RestaurantID,
                                        restName = selectResult.rest.Name }
                                   ).OrderBy(sres => sres.restaurantID)
                                   .ToListAsync();
            return Ok(dishes);
        }

        // POST api/dishes
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

        // PATCH api/dishes/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Dish dish) {
            if(dish == null || dish.DishID != id) {
                return BadRequest();
            }

            var dishToUpdate = await _context.Dishes
                                             .SingleOrDefaultAsync(
                                                 d => d.DishID == id
                                             );

            if(dishToUpdate == null){
              return NotFound();
            }

            dishToUpdate.Name         = dish.Name;
            dishToUpdate.RestaurantID = dish.RestaurantID;
            dishToUpdate.Price        = dish.Price;

            try {
                _context.Dishes.Update(dishToUpdate);
                await _context.SaveChangesAsync();
                return Ok();
            }catch(DbUpdateException /* ex */){
                Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                return Json(new { error = "Ocorreu um erro interno, por favor tente novamente." });
            }
        }

        // DELETE api/dishes/{id}
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
