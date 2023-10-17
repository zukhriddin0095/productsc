import { Button, Col, Flex, Input, Modal, Row, Spin, Form } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCategories } from "../../redux/slice/categorySlice";
import CategoryCard from "../../components/Layout/card/CategoryCard";
import { CategoryType } from "../../types/category";
import request from "../../server";

const CategoryPage = () => {
  const { categories, loading } = useAppSelector((state) => state.category);

  const dispatch = useAppDispatch();

  const [selected, setSelected] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [searchText, setsearchText] = useState("");

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setSelected(null);
    setIsModalOpen(true);
    form.resetFields();
  };

  async function handleOk() {
    try {
      const values: CategoryType = await form.validateFields();
      if (selected === null) {
        await request.post("categories", values);
      } else {
        await request.put(`categories/${selected}`, values);
      }
      closeModal();
      dispatch(getCategories());
    } catch (error) {
      console.log(error);
    }
  }
  async function editCategory(id: string) {
    setSelected(id);
    const { data } = await request.get(`categories/${id}`);
    form.setFieldsValue(data);
    dispatch(getCategories());
    setIsModalOpen(true);
  }

  async function deleteC(id: string) {
    if(confirm("ochirish")){
      await request.delete(`categories/${id}`);     
    }
    dispatch(getCategories());
  }

  return (
    <div>
      <div style={{ paddingBottom: "10px" }}>
        <Flex justify="space-evenly" align="center">
          <h1>Total Category: ({categories.length})</h1>
          {/* <Input
            onChange={(e) => setsearchText(e.target.value)}
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
        <Row gutter={8}>
          {categories.map((category) => (
            <Col
              style={{ marginBottom: "10px" }}
              key={category.id}
              className="gutter-row"
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <CategoryCard
                {...category}
                editCategory={editCategory}
                deleteC={deleteC}
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
          <Form.Item<CategoryType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please fill!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<CategoryType>
            label="Image"
            name="avatar"
            rules={[{ required: true, message: "Please fill!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryPage;
