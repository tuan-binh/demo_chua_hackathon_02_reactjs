import { Button, Table, Tag } from 'antd';

import type { TableProps } from 'antd';

interface DataType {
  id: number;
  name: string;
  address: string;
  status: boolean;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Tên kho', // hiển thị tên cột
    dataIndex: 'name', // mapping đến key của dataSource
    key: 'name',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      return (
        <Tag color={status ? 'green' : 'red'}>
          <>{status ? 'Hoạt động' : 'Ngừng hoạt động'}</>
        </Tag>
      );
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <>
        <Button variant="outlined" color="blue">
          Sửa
        </Button>
        <Button variant="outlined" color="red">
          Xóa
        </Button>
      </>
    ),
  },
];

const data: DataType[] = [
  {
    id: 1,
    name: 'Ngô Xuân Hoàng',
    address: 'Cầu giấy',
    status: true,
  },
  {
    id: 2,
    name: 'Nguyễn Tiến Thành',
    address: 'Vịnh Hà Đông',
    status: false,
  },
  {
    id: 3,
    name: 'Bàng Trọng Tú',
    address: 'Vịnh Triều Khúc',
    status: true,
  },
];

function MainContent() {
  return (
    <div>
      {/* table */}
      <Table<DataType>
        columns={columns}
        dataSource={data}
        pagination={{
          total: 500,
          pageSize: 5,
          current: 2,
          pageSizeOptions: [5, 10, 15, 20, 25],
        }}
      />
    </div>
  );
}

export default MainContent;
