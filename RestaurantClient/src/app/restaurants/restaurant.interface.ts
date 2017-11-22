import { Dish } from 'app/dishes/dish.interface';

export interface Restaurant {
  restaurantID: number;
  name: string;
  dishes: Dish[];
}
