import React, { useState } from 'react';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Input } from 'antd';
import type {  MenuProps  } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const items: MenuProps['items'] = [
    {
      label: '检测结果',
      key: 'result',
    },
    {
      label: '检测分析',
      key: 'test',
    },
    {
      label: '图表分析',
      key: 'chart',
    },
  ];



const DetectionPage: React.FC = () => {
    const [current, setCurrent] = useState('result');
    const navigateTo = useNavigate();
    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
        navigateTo('/DetectionPage/' + e.key);
      };

  return (
    <div>
        <div className='selectInform' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
            <div>
              <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            </div>
            <div>
                <Input size="large" placeholder="请输入" prefix={<SearchOutlined />} />
            </div>
        </div>
        <Outlet></Outlet>
    </div>
  );
};
  
  export default DetectionPage;