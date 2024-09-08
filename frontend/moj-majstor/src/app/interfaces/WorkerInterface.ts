import {Category} from "./enums/Category";
import {Municipality} from "./enums/Municipality";

export interface WorkerInterface {
  description: String,
  address: String,
  municipality: Municipality,
  phoneNumber: String,
  category: Category,
  averageRating: number
}
