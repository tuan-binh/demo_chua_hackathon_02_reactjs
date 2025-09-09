import { Button, Form, Input, Select } from 'antd';
import React, { useEffect } from 'react';

import type { DataType } from './MainContent';
import type { FormProps } from 'antd';
import { useForm } from 'antd/es/form/Form';

type FieldType = {
  id?: number;
  name?: string;
  address?: string;
  status?: boolean;
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

interface Props {
  setDataEdit: (value: DataType | null) => void;
  dataEdit: DataType | null;
  warehouse: DataType[];
  setWarehouse: (value: DataType[]) => void;
}

const FormWarehouse = ({ setDataEdit, dataEdit, warehouse, setWarehouse }: Props) => {
  const [form] = useForm<DataType>();

  const onFinish: FormProps<DataType>['onFinish'] = (values) => {
    if (dataEdit) {
      // chức năng sửa
      setWarehouse(
        warehouse.map((item) => {
          if (item.id === dataEdit.id) {
            return { ...item, ...values };
          }
          return item;
        }),
      );
      setDataEdit(null);
    } else {
      // chức năng thêm mới
      setWarehouse([{ ...values, id: new Date().getTime() }, ...warehouse]);
    }
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue({
      ...dataEdit,
    });
  }, [dataEdit, form]);

  return (
    <Form
      form={form}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="inline"
    >
      <Form.Item<FieldType>
        name="name"
        rules={[{ required: true, message: 'Tên không được bỏ trống!' }]}
      >
        <Input placeholder="tên kho..." />
      </Form.Item>

      <Form.Item<FieldType>
        name="address"
        rules={[{ required: true, message: 'Địa chỉ không được để trống!' }]}
      >
        <Input placeholder="địa chỉ..." />
      </Form.Item>

      <Form.Item<FieldType>
        name="status"
        rules={[{ required: true, message: 'Trạng thái không được để trống!' }]}
      >
        <Select
          style={{ minWidth: 200 }}
          options={[
            { value: true, label: 'Hoạt động' },
            { value: false, label: 'Ngừng hoạt động' },
          ]}
        />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormWarehouse;
