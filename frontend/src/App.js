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
            <Menu.Item key="5" icon={<img src='./bloomsburg.png' width="20px" alt='bloomsburg' />} onClick={() => changeHeader(4)}>
              Bloomsburg
            </Menu.Item>
            <Menu.Item key="6" icon={<img src='./harcourt.png' width="20px" alt='harcourt' />} onClick={() => changeHeader(5)}>
              Harcourt
            </Menu.Item>
            <Menu.Item key="7" icon={<img src='./nourison.png' width="20px" alt='nourison' />} onClick={() => changeHeader(6)}>
              Nourison
            </Menu.Item>
            <Menu.Item key="8" icon={<img src='./kaleen.png' width="20px" alt='kaleen' />} onClick={() => changeHeader(7)}>
              Kaleen
            </Menu.Item>
            <Menu.Item key="9" icon={<img src='./fabrica.png' width="20px" alt='fabrica' />} onClick={() => changeHeader(8)}>
              Fabrica
            </Menu.Item>
            <Menu.Item key="10" icon={<img src='./dixie.png' width="20px" alt='dixie' />} onClick={() => changeHeader(9)}>
              Dixie
            </Menu.Item>
            <Menu.Item key="11" icon={<img src='./masland.png' width="20px" alt='masland' />} onClick={() => changeHeader(10)}>
              Masland
            </Menu.Item>
            <Menu.Item key="12" icon={<img src='./andersontuftex.png' width="20px" alt='andersontuftex' />} onClick={() => changeHeader(11)}>
              Anderson Tuftex
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