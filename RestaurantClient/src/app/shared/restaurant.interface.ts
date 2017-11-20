import { Dish } from './dish.interface';

export interface Restaurant {
  id: number;
  name: string;
  dishes: Dish[];
}
