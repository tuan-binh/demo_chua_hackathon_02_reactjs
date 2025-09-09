import { Button, Form, Input, Select } from 'antd';

import type { FormProps } from 'antd';
import React from 'react';

type FieldType = {
  name?: string;
  address?: string;
  status?: boolean;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const FormWarehouse: React.FC = () => (
  <Form
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

export default FormWarehouse;
