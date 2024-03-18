import { BrowserRouter as Router} from 'react-router-dom';
import MainTable from './components/MainTable';
import "./App.css";
import React, { useState } from 'react';
import './index.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { siteNames } from './utils/static';

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("Prestige");
  const changeHeader = (title) => {
    setHeaderTitle(siteNames[title])
  }
  return (
    <Layout className="site-layout">
      <Router> {/* Wrap the Sider content with Router */}
        <Sider className="site-layout-sider" trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
          >
            <Menu.Item key="1" icon={<img src='./prestige.png' alt='prestige' width="20px" />} onClick={() => changeHeader(0)}>
              Prestige
            </Menu.Item>
            <Menu.Item key="2" icon={<img src='./couristan.png' width="20px" alt='couristan' />} onClick={() => changeHeader(1)}>
              Couristan
            </Menu.Item>
            <Menu.Item key="4" icon={<img src='./kaya.png' width="20px" alt='kaya' />} onClick={() => changeHeader(3)}>
              Kaya
            </Menu.Item>
            <Menu.Item key="3" icon={<img src='./fibre.svg' width="20px" alt='fibre' />} onClick={() => changeHeader(2)}>
              FibreWorks
            </Menu.Item>

          </Menu>
        </Sider>
        <Layout style={{ backgroundColor: 'white' }}>
          <Header className="site-layout-header" style={{ padding: 0, fontSize: "20px", backgroundColor: "grey" }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
            {headerTitle}
          </Header>
          <Content
            className="site-layout-content"
            style={{
              minHeight: 280,
              backgroundColor: "white",
              marginTop: "110px"
            }}
          >
            <MainTable current={headerTitle} />
          </Content>
        </Layout>
      </Router>
    </Layout>
  );
};

export default App;