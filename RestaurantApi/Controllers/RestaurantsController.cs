﻿using System;
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
        // TODO: edit restaurante
        
        // GET api/restaurants
        [HttpGet]
        public async Task<IEnumerable<Restaurant>> GetAll() {
            return await _context.Restaurants.ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Restaurant rest) {
            if(rest == null) {
                return BadRequest(new { msg = "Please Specify a Restaurant Name."});
            }

            try {
                _context.Restaurants.Add(rest);
                await _context.SaveChangesAsync();
                return Ok();
            } catch (DbUpdateException /* ex */) {
                Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                return BadRequest(new { msg = "Something went wrong while saving, please try again."});
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) {
            var restaurant = await _context.Restaurants
                                    .AsNoTracking()
                                    .SingleOrDefaultAsync(r => r.RestaurantID == id);
            if(restaurant == null){
                return NotFound();
            }

            try {
                _context.Restaurants.Remove(restaurant);
                await _context.SaveChangesAsync();
                return Ok();
            } catch (DbUpdateException /* ex */) {
                return BadRequest(new { msg = "Something went wrong while deleting, please try again."});
            }
        }
    }
}