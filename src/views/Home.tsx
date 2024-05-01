import React, { useState } from 'react';
import {
  BarChartOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Radio, theme } from 'antd';
import Timer from '@/components/Timer/Timer';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const HomeView: React.FC = () => {
  const [collapsed] = useState(false);
  const navigateTo = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const menuClick = (e: {key:string}) => {
    if(e.key === '/DetectionPage'){
      navigateTo('/DetectionPage/result');
    }
    else{
      navigateTo(e.key);
    }
    
  }

  return (
    <Layout>
      <div style={{ height: "100%" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" >
            <h1 className="demo-logo-vertical-title">排水管道检测</h1>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={menuClick}
            items={[
              {
                key: '/HomePage',
                icon: <HomeOutlined />,
                label: '首页',
              },
              {
                key: '/DetectionPage',
                icon: <StarOutlined />,
                label: '检测',
              },
              {
                key: '/AnalysisPage',
                icon: <BarChartOutlined />,
                label: '分析',
              },
              {
                key: '/HelpPage',
                icon: <QuestionCircleOutlined />,
                label: '帮助',
              },
              {
                key: '/SettingPage',
                icon: <SettingOutlined />,
                label: '设置',
              },
            ]}
          />
        </Sider>
      </div>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{ 
            float: 'right', marginRight: '1660px'}}>
            <Timer />
          </div>
          <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          <Outlet></Outlet>
        </Content>
        </Header>
      </Layout>
    </Layout>
  );
};

export default HomeView;