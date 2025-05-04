import React, { useState } from "react";
import { Layout } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import BeneficiaryDashboard from "../../components/BeneficiaryDashboard/BeneficiaryDashboard";
import MyCompains from "../../pages/MyCompains/MyCompains";
import ProfilePage from "../../pages/profilepage/ProfilePage";
import NewCompainPage from "../../pages/NewCampain/NewCampainPage";
import DocumentsPage from "../../pages/DocumentsPage/DocumentsPage";
import CommunityPage from "../../pages/CommunityPage/CommunityPage";


const { Header, Sider, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("dashboard");

  const renderContent = () => {
    switch (selectedMenu) {
      case "dashboard":
        return <BeneficiaryDashboard/> ;
      case "campaigns":
        return <MyCompains/>;
      case "profile":
        return <ProfilePage/>;
      case "NewCampaign":
        return <NewCompainPage/>;
      case "Documents":
        return <DocumentsPage/>;
      case "Community":
        return <CommunityPage/>;
      default:
        return <h2>Not Found</h2>;
    }
  };

  return (
    <Layout style={{ minHeight: "150vh", flexDirection: "column" }}>
      <Header style={{ background: "#fff", padding: 0, height: 64, position: "fixed", width: "100%", zIndex: 1000 }}>
        <Navbar onSelect={setSelectedMenu}/>
      </Header>
      <Layout style={{ marginTop: 64, height: "calc(100vh - 64px)" }}>
        <Sider
          width={260}
          style={{ background: "#fff", height: "100%", position: "fixed", left: 0, top: 64, bottom: 0, paddingTop: 40 }}
        >
          <Sidebar onSelect={setSelectedMenu} />
        </Sider>
        <Layout style={{ marginLeft: 260 }}>
          <Content style={{ margin: "40px", padding: 16, background: "#f5f5f5" }}>
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
