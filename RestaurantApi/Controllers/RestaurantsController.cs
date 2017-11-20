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
    public class RestaurantsController : Controller
    {
        private readonly ManagementContext _context;
        public RestaurantsController(ManagementContext context){
            _context = context;
        }
        
        // GET api/restaurants
        [HttpGet]
        public async Task<IEnumerable<Restaurant>> GetAll() {
            return await _context.Restaurants.ToListAsync();
        }

        // GET api/restaurants/search?name=
        [HttpGet("search")]
        public async Task<IActionResult> GetRestaurant(string name){
            if(name == null){
              return BadRequest();
            }

            var res = await _context.Restaurants.FirstOrDefaultAsync(r => r.Name == name);

            if(res == null){
                return NotFound();
            }

            return Ok(res);
        }

        // POST api/restaurants
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Restaurant rest) {
            if(rest == null) {
                return BadRequest();
            }

            try {
                _context.Restaurants.Add(rest);
                await _context.SaveChangesAsync();
                return Ok();
            } catch (DbUpdateException /* ex */) {
                Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                return Json(new { error = "Ocorreu um erro interno, por favor tente novamente."});
            }
        }

        // PATCH api/restaurants/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Restaurant rest) {
            if(rest == null || rest.RestaurantID != id) {
                return BadRequest();
            }

            var restToUpdate = await _context.Restaurants
                                        .SingleOrDefaultAsync(
                                            r => r.RestaurantID == id
                                        );

            if(restToUpdate == null){
              return NotFound();
            }

            restToUpdate.Name = rest.Name;

            try {
                _context.Restaurants.Update(restToUpdate);
                await _context.SaveChangesAsync();
                return Ok();
            }catch(DbUpdateException /* ex */){
                Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                return Json(new { error = "Ocorreu um erro interno, por favor tente novamente." });
            }
        }

        // DELETE api/restaurants/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) {
            var restaurant = await _context.Restaurants
                                    .AsNoTracking()
                                    .SingleOrDefaultAsync(
                                        r => r.RestaurantID == id
                                    );
            if(restaurant == null){
                return NotFound();
            }

            try {
                _context.Restaurants.Remove(restaurant);
                await _context.SaveChangesAsync();
                return Ok();
            } catch (DbUpdateException /* ex */) {
                Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                return Json(new { error = "Ocorreu um erro interno, por favor tente novamente." });
            }
        }
    }
}
