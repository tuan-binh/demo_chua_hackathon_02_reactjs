import { Button, Modal, Table, Tag } from 'antd';
import { useRef, useState } from 'react';

import type { TableProps } from 'antd';

export interface DataType {
  id: number;
  name: string;
  address: string;
  status: boolean;
}

interface Props {
  warehouse: DataType[];
  setWarehouse: (value: DataType[]) => void;
  handleShowEdit: (record: DataType) => void;
}

function MainContent({ warehouse, setWarehouse, handleShowEdit }: Props) {
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
          <Button variant="outlined" color="blue" onClick={() => handleShowEdit(record)}>
            Sửa
          </Button>
          <Button variant="outlined" color="red" onClick={() => handleShow(record.id)}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  const ref = useRef<number>(-1);

  const [isOpen, setIsOpen] = useState(false);
  // mở modal phải lưu id đối tượng muốn xóa
  const handleShow = (id: number) => {
    setIsOpen(true);
    ref.current = id;
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    setIsOpen(false);
    setWarehouse(warehouse.filter((item) => item.id !== ref.current));
  };

  return (
    <div>
      {/* table */}
      <Table<DataType>
        columns={columns}
        dataSource={warehouse}
        pagination={{
          total: 500,
          pageSize: 5,
          current: 2,
          pageSizeOptions: [5, 10, 15, 20, 25],
        }}
      />

      {/* modal */}
      <Modal
        title="Xác nhận"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isOpen}
        onOk={handleDelete}
        onCancel={handleClose}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa hay không</p>
      </Modal>
    </div>
  );
}

export default MainContent;
