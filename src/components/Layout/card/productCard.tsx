import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { ProductType } from "../../../types/porduct";


import "./products.scss"
const ProductCard = ({
  name,
  image,
  price,
  discount,
  description,
  id,
  editBtn,
  deleteProduct,
}: ProductType) => {
  return (
    <div className="card">
      <div className="card__image">
        <img src={image} alt={name} />
      </div>
      <div className="card__title">
        <div className="card__title__1">
          <h3>{name}</h3>
          <h5>{price} $</h5>
        </div>
        <p>{description}</p>
        <p>{discount}</p>
        <div className="card__title__btn">
          <button onClick={() => editBtn(id)}>
            <EditOutlined />
          </button>

          <button onClick={() => deleteProduct(id)}>
            <DeleteOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
