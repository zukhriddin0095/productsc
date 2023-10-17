export interface CategoryType {
  id: string;
  name: string;
  avatar: string;
  editCategory: (id: string) => void;
  deleteC: (id: string) => void;
}

export interface CategoryResponseType extends CategoryType {
  createdAt: string;
}
