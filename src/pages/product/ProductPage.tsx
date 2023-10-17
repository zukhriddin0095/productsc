import {
  Button,
  Col,
  Flex,
  Input,
  Modal,
  Row,
  Spin,
  Form,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../../server";
import ProductCard from "../../components/Layout/card/productCard";
import { ProductType } from "../../types/porduct";

const ProductPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<string | null>(null);
  // const [searchText, setsearchText] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    try {
      setLoading(true);
      const { data } = await request.get(`categories/${id}/product`);
      setData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleOk() {
    try {
      const values: ProductType = await form.validateFields();
      setLoading(true);
      if (selected === null) {
        await request.post(`categories/${id}/product`, values);
        message.success("qoshildi")
      } else {
        await request.put(`categories/${id}/product/${selected}`, values);
        message.success("o'zgartirildi");
      }
      closeModal();
      getProduct();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function editBtn(i: string) {
    try {
      setIsModalOpen(true);
      setLoading(true);
      const { data } = await request.get(`categories/${id}/product/${i}`);
      form.setFieldsValue(data);
      getProduct();
      setSelected(i);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteProduct(i: string) {
    if (confirm("o'chirish")) {
      await request.delete(`categories/${id}/product/${i}`);
      getProduct();
      message.success("ochirildi")
    } else {
      message.error("o'chirilmadi")
    }
    }

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setSelected(null);
    setIsModalOpen(true);
    form.resetFields();
  };
  return (
    <div>
      <div style={{ paddingBottom: "10px" }}>
        <Flex justify="space-evenly" align="center">
          <h1>Total Porducts: ({data.length})</h1>
          {/* <Input
            // onChange={(e) => setsearchText(e.target.value)}
            style={{
              width: "50%",
            }}
            placeholder=" search Categories"
          /> */}
          <Button onClick={showModal} className="primary">
            Add
          </Button>
        </Flex>
      </div>
      <Spin spinning={loading}>
        <Row gutter={16} style={{ gap: "0px" }}>
          {data.map((el) => (
            <Col
              style={{ marginBottom: "10px" }}
              key={id}
              className="gutter-row"
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <ProductCard
                {...el}
                editBtn={editBtn}
                deleteProduct={deleteProduct}
              />
            </Col>
          ))}
        </Row>
      </Spin>
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        onOk={handleOk}
        title="Basic Modal"
      >
        <Form
          name="category"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          form={form}
          autoComplete="off"
        >
          <Form.Item<ProductType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please fill!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<ProductType>
            label="Image"
            name="image"
            rules={[{ required: true, message: "Please fill!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<ProductType>
            label="price"
            name="price"
            rules={[{ required: true, message: "Please fill!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item<ProductType>
            label="discount"
            name="discount"
            rules={[{ required: true, message: "Please fill!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item<ProductType>
            label="description"
            name="description"
            rules={[{ required: true, message: "Please fill!" }]}
          >
            <Input aria-atomic />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductPage;
