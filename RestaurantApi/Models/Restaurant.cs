using System.Collections.Generic;

namespace RestaurantApi.Models {
  public class Restaurant {
    public int RestaurantID { get; set; }
    public string Name { get; set; }

    // -- navigation properties
    public ICollection<Dish> Dishes { get; set; }
    // may have many dishes

  }
}