export interface Order {
  name: string;
  lastName: string;
  address: string;
  phone: string;
  state: string;
  city: string;
  dateTime: Date;
  ordered: boolean;
  zip: string;
  cart: {productId: string, name: string, size: number, quantity: number}[];
  _id: string;
}
