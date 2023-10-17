import { Form, Button, Input, message } from "antd";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

import "./login.scss";
import { LoginType } from "../../types/loginType";
import { AuthContext } from "../../context/AuthContex";
import { LoginResponseType } from "../../types/loginResponse";
import { TOKEN } from "../../constants";
import { useContext, useState } from "react";


const LoginPage = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const onFinish = async (values: LoginType) => {
    try {
      setLoading(true)
      const {
        data: { token },
      }: AxiosResponse<LoginResponseType> = await axios.post(
        "https://reqres.in/api/login",
        values
      );
      localStorage.setItem(TOKEN, token);
      setIsAuthenticated(true)
      navigate("/categories");
      setLoading(false)
    } catch (err) {
      message.error("hato");
    }
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };
  return (
    <div className="className">
      <Form
      name="basic"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
    
  );
};

export default LoginPage;
