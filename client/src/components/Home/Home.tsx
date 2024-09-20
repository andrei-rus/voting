import React, { useState } from "react";
import { LogoutOutlined, EnvironmentOutlined, FileDoneOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { RomaniaMap } from "../RomaniaMap/RomaniaMap";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { Vote } from "../Vote/Vote";

const { Content, Sider, Header } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("1");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    if (e.key === "3") {
      navigate("/");
    }
  };

  const items: MenuItem[] = [
    getItem("Harta", "1", <EnvironmentOutlined />),
    getItem("Vot", "2", <FileDoneOutlined />),
    getItem("Logout", "3", <LogoutOutlined />),
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          onClick={onClick}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0 }} /> */}
        <Content className="layout">
          <div className="layout-content">
            {current === "1" ? <RomaniaMap /> : <Vote/>}
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Powerd by an awsome team !
        </Footer> */}
      </Layout>
    </Layout>
  );
};
