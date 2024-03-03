import { BrowserRouter as Router, Routes, Route,Link} from 'react-router-dom';
import Prestige from './components/Prestige';
import Couristan from './components/Couristan';
import "./App.css";
import React, { useState } from 'react';
import './index.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SkinOutlined ,
  SketchOutlined
  
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';


const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Router> {/* Wrap the Sider content with Router */}
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
            >
              <Menu.Item key="1" icon={<SkinOutlined />}>
                <Link to="/">Prestige</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<SketchOutlined />}>
                <Link to="/couristan">Couristan</Link>
              </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              minHeight: 280,
              overflow:"auto",
            }}
            >
              <Routes>
                <Route path = "/" exact element={<Prestige/>}/>
                <Route path = "/couristan" exact element={<Couristan/>}/>
              </Routes>
          </Content>
        </Layout>
      </Router>
    </Layout>
  );
};

export default App;