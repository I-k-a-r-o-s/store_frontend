export interface Item {
  _id: string;
  name: string;
  price: number;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ItemDetails {
  name: string;
  price: string;
  image: string;
}