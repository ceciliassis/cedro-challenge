import { Dish } from './dish.interface';

export interface Restaurant {
  restaurantID: number;
  name: string;
  dishes: Dish[];
}
