import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import axios from "axios";


interface DataType {
    dataId: React.Key;
    videoName: string;
    targetName: string;
    location: string;
    corrode: number;
    breakValue: number;
}

const columns: TableColumnsType<DataType> = [
    {
    title: '视频名称',
    dataIndex: 'videoName',
    },
    {
    title: '管段名称',
    dataIndex: 'targetName',
    },
    {
    title: '检测地点',
    dataIndex: 'location',
    },
    {
        title: '腐蚀',
        dataIndex: 'corrode',
    },
    {
        title: '破裂',
        dataIndex: 'breakValue',
    },
];

const ResultPage: React.FC = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
          setSelectedRowKeys([]);
          setLoading(false);
        }, 1000);
      };
    
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };
    
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

      // get all data from database
      function getAllData() {
        axios.get('http://localhost:8080/data/getall')
        .then((response) => {
            console.log(response.data);
            setData(response.data);       
        })
        .catch((error) => {
            console.log(error);
        });
      }

      useEffect(() => {
        getAllData();
      }, []);

  return (
    <div>
        <Table rowKey={record => record.dataId} rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};
  
  export default ResultPage;