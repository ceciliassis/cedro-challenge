using RestaurantApi.Models;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace RestaurantApi.Data {
  public static class DbInitializer {
    public static void Initializer(ManagementContext context){
      context.Database.Migrate(); // ensure migration
    }
  }
}