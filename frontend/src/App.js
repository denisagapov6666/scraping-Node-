import { BrowserRouter as Router, Routes, Route,Link} from 'react-router-dom';
import Prestige from './components/Prestige';
import Couristan from './components/Couristan';
import Fibre from './components/Fibre';
import "./App.css";
import React, { useState } from 'react';
import './index.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';


const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [headerTitle,setHeaderTitle] = useState("Prestige");
  const [scrollvalue,setScrollValue] = useState(0);
  const changeHeader = (title,e) =>{
    setHeaderTitle(title)
  }
  const changeScroll = (e)=>{
    setScrollValue(e.target.scrollLeft);
  }
  return (
    <Layout  className="site-layout">
      <Router> {/* Wrap the Sider content with Router */}
        <Sider className="site-layout-sider" trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
            >
              <Menu.Item key="1" icon={<img src='./prestige.png' alt='prestige' width="14px"/>}>
                <Link to="/" onClick={(e) => changeHeader("Prestige",e)}>
                  Prestige
                </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<img src='./couristan.png' width="14px" alt='couristan'/>}>
                <Link to="/couristan" onClick={(e) => changeHeader("Couristan",e)}>
                  Couristan
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<img  src='./fibre.png' alt='fibre' width="14px"/>}>
                <Link to="/fibreworks" onClick={(e) => changeHeader("FibreWorks",e)}>
                  FibreWorks
                </Link>
              </Menu.Item>
              
            </Menu>
        </Sider>
        <Layout style={{backgroundColor:'white'}}>
          <Header className="site-layout-header" style={{ padding: 0,fontSize:"20px",backgroundColor:"grey" }}>
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
              backgroundColor:"white",
              marginTop:"110px"
            }}
            onScroll = {(e)=>changeScroll(e)}
            >
              <Routes>
                <Route path = "/" exact element={<Prestige scrollvalue = {scrollvalue}/>}/>
                <Route path = "/couristan"  element={<Couristan/>}/>
                <Route path = "/fibreworks" element={<Fibre/>}/>
              </Routes>
          </Content>
        </Layout>
      </Router>
    </Layout>
  );
};

export default App;