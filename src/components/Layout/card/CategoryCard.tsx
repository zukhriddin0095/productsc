import { Button, Card } from "antd";
import { CategoryType } from "../../../types/category";
import {
  EditOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


function CategoryCard({
  name,
  avatar,
  id,
  editCategory,
  deleteC,
}: CategoryType) {
  const { Meta } = Card;
  const navigate = useNavigate();

  const product = (id: CategoryType) => {
    navigate(`/products/${id}`);
  };
  return (
    <Card hoverable cover={<img height={200} src={avatar} alt={name} />}>
      <Meta title={name} style={{ marginBottom: "20px" }} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <Button onClick={() => editCategory(id)} type="primary">
          <EditOutlined />
        </Button>
        <Button onClick={() => deleteC(id)} type="primary" danger>
          <DeleteOutlined />
        </Button>
        <Button onClick={() => product(id)} type="primary">
          <ShoppingCartOutlined />
          products
        </Button>
      </div>
    </Card>
  );
}

export default CategoryCard;
