export interface ProductType {
  id: string;
  name: string;
  image: string;
  price: string;
  discount: string;
  description: string;
  editBtn: (id: string) => void;
  deleteProduct: (id: string) => void;
}

export interface ProductResponseType extends ProductType {
  createdAt: string;
}
