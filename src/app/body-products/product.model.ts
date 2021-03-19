import { StringifyOptions } from 'querystring';

export interface Product {
  name: string;
  about: string;
  price: number;
  _id: string;
  cathegory: string;
  brand: string;
  sizes: {size: number, count: number}[];
  imagePath: string;
}
