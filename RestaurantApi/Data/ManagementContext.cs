using RestaurantApi.Models;
using Microsoft.EntityFrameworkCore;

namespace RestaurantApi.Data {
  public class ManagementContext : DbContext {
    public ManagementContext(DbContextOptions<ManagementContext> options) : base(options){}

    public DbSet<Restaurant> Restaurants { get; set; }
    public DbSet<Dish> Dishes { get; set; }
  }
}