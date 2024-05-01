import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import axios from 'axios';



interface DataType {
  dataId: React.Key;
    material: string;
    targetName: string;
    location: string;
    corrode: number;
    breakValue: number;
    total: number;
}

const columns: TableColumnsType<DataType> = [
    {
      title: '管段名称',
      dataIndex: 'targetName',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: '检测地点',
      dataIndex: 'location',
      filters: [
        {
          text: '矿大操场',
          value: '矿大操场',
        },
        {
          text: '矿大学一',
          value: '矿大学一',
        },
        {
          text: '龙岩区白银路',
          value: '龙岩区白银路',
        },
        {
          text: '矿大南门',
          value: '矿大南门',
        }
      ],
      onFilter: (value, record) => {
        return record.location === value;
      },
    },
    {
      title: '管道材质',
      dataIndex: 'material',
      filters: [
        {
          text: 'PVC',
          value: 'PVC',
        },
        {
          text: '混凝土',
          value: '混凝土',
        },
      ],
      onFilter: (value, record) => {
        return record.material === value;
      },
    },
    {
        title: '腐蚀',
        dataIndex: 'corrode',
        sorter:(record1, record2) => {
            return record1.corrode - record2.corrode;
        }
    },
    {
        title: '破裂',
        dataIndex: 'breakValue',
        sorter:(record1, record2) => {
            return record1.breakValue - record2.breakValue;
        }
    },
    {
      title: '病害总数',
      dataIndex: 'total',
      sorter:(record1, record2) => {
          return record1.total - record2.total;
      }
  },
];


const AnalysisPage: React.FC = () => {
 
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
    
      // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: (record: DataType) => ({
        name: record.targetName,
      }),
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
  
  export default AnalysisPage;