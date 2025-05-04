import React from "react";
import { Layout } from "antd";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import ProjectList from "../ProjectList/ProjectList";


const { Header, Sider, Content } = Layout;

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "150vh", flexDirection: "column" }}>
      <Header style={{ background: "#fff", padding: 0, height: 64, position: "fixed", width: "100%", zIndex: 1000 }}>
        <Navbar />
      </Header>
      <Layout style={{ marginTop: 64, height: "calc(100vh - 64px)" }}>
        <Sider
          width={260}
          style={{
            background: "#fff",

            height: "100%",
            position: "fixed",
            left: 0,
            top: 64,
            bottom: 0,
            paddingTop: 40
          }}
        >
          <Sidebar />
        </Sider>
        <Layout style={{ marginLeft: 250 }}>
          <Content style={{ margin: "40px", padding: 16, background: "#f5f5f5" }}>
            <h1 style={{ marginBottom: "20px" }}>All Projects</h1>
            <ProjectList />
          </Content>

        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
