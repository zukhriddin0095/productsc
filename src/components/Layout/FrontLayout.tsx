import {
  UserOutlined,
  CodepenCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { TOKEN } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContex";

const { Content, Footer, Sider } = Layout;
const FrontLayout = () => {
  const {setIsAuthenticated} = useContext(AuthContext)
  const location = useLocation();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();


  async function logaout() {
    localStorage.removeItem(TOKEN);
    setIsAuthenticated(false)
    navigate("/");
  }
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/categories",
              icon: <UserOutlined />,
              label: <Link to="/categories">Categories</Link>,
            },
            {
              key: "/products",
              icon: <CodepenCircleOutlined />,
              label: <Link to="/products">Products</Link>,
            },
            {
              key: "/",
              icon: <LogoutOutlined />,
              label: <Button danger onClick={logaout}> Logaut</Button>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default FrontLayout;
