namespace RestaurantApi.Models {
  public class Dish {
    public int DishID { get; set; }
    public int RestaurantID { get; set; } // foreign key
    public string Name { get; set; }
    public float Price { get; set; }

    // -- navigation properties
    public Restaurant Restaurant { get; set; }
  }

}