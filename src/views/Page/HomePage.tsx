import React, { useState } from 'react';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, InboxOutlined } from '@ant-design/icons';
import type { UploadProps, TableProps, GetProp } from 'antd';
import { message, Table, Upload, Space, Tag, Select } from 'antd';
import { Pie } from '@ant-design/charts';
import './page.scss';

const { Dragger } = Upload;
type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface DataType {
  videoName: string;
  targetName: string;
  status: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps<DataType>, 'onChange'>>[1];
}

const columns: ColumnsType<DataType> = [
  {
    title: '管道视频',
    dataIndex: 'videoName',
    width: '40%',
  },
  {
    title: '管段名称',
    dataIndex: 'targetName',
    width: '30%',
  },
  {
    title: '状态',
    dataIndex: 'status',
    filters: [
      {
        text: '未开始',
        value: '未开始',
      },
      {
        text: '进行中',
        value: '进行中',
      },
      {
        text: '成功',
        value: '成功',
      },
    ],
    onFilter: (value, record) => {
      return record.status === value;
    },
    render: (status) => {
      let icon;
      switch (status) {
          case '成功':
              icon = <CheckCircleOutlined style={{ color: 'green' }} />;
              break;
          case '进行中':
              icon = <ClockCircleOutlined style={{ color: 'orange' }} />;
              break;
          case '未开始':
              icon = <CloseCircleOutlined style={{ color: 'red' }} />;
              break;
          default:
              icon = null;
      }
      return (
          <span>
              {icon} {status}
          </span>
      );
    },
  }
];

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const HomePage: React.FC = () => {
  // const [data, setData] = useState<DataType[]>();  // 动态数据保存调取方法
  const data: DataType[] = [
    {
      videoName: '矿大操场2号管道.avi',
      targetName: '矿大操场2号管道',
      status: '未开始',
    },
    {
      videoName: '矿大操场1号管道.avi',
      targetName: '矿大操场1号管道',
      status: '进行中',
    },
    {
      videoName: '矿大操场3号管道.avi',
      targetName: '矿大操场3号管道',
      status: '成功',
    },
    {
      videoName: '矿大学-1号管道.avi',
      targetName: '矿大学-1号管道',
      status: '成功',
    },
    {
      videoName: '矿大学-2号管道.avi',
      targetName: '矿大学-2号管道',
      status: '进行中',
    },
    {
      videoName: '矿大学-3号管道.avi',
      targetName: '矿大学-3号管道',
      status: '进行中',
    },
  ];
  const [loading, setLoading] = useState(false);
  const [tolValue, setTolValue] = useState(10709);
  const [PLValue, setPLValue] = useState(6586);
  const [FSValue, setFSValue] = useState(4123);

  const pieData = [
    {
      type: 'PL',
      // value: PLValue*100/tolValue,
      value: PLValue,
    },
    {
      type: 'FS',
      // value: FSValue*100/tolValue,
      value: FSValue,
    }
  ]

  const pieConfig = {
    forceFit: true,
    radius: 0.8,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    label: {
      visible: true,
      type: 'inner',
    },
  }

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // // `dataSource` is useless since `pageSize` changed
    // if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    //   setData([]);
    // }
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };


  return (
    <div>
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                banned files.
            </p>
        </Dragger>
        <div className='pipeData' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='valueDisplay'>
              <Space wrap>
                  <Select
                      defaultValue="矿大操场1号管道"
                      style={{ width: 180 }}
                      onChange={handleChange}
                      options={[
                          { value: 'pipe1', label: '矿大操场1号管道' },
                          { value: 'pipe2', label: '矿大操场2号管道' },
                          { value: 'pipe3', label: '矿大操场3号管道' },
                      ]}
                  />
              </Space>
              <span className="total-value"> {tolValue}</span>
          </div>
          <div className='divider'></div>
          <div className='pieData'>
              <Pie {...pieConfig} />
          </div>
        </div>
        <div>
            <div>
              <Table
                className="table-pagination-center"
                columns={columns}
                rowKey={(record) => record.videoName}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
              />
            </div>
        </div>
    </div>
  );
};
  
  export default HomePage;