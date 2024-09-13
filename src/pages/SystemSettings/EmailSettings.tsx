// 
import React from 'react';
import { Tabs } from 'antd';
import Settings from './Settings';
import EmailTemplate from './EmailTemplate';
import Queue from './Queue';
import SendEmail from './SendEmail';
import { ProCard } from '@ant-design/pro-components';

const { TabPane } = Tabs;

const EmailManagement = () => {
  return (
    <ProCard title="Email Management" bordered>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Settings" key="1">
          <Settings />
        </TabPane>
        <TabPane tab="Email Template" key="2">
          <EmailTemplate />
        </TabPane>
        <TabPane tab="Queue" key="3">
          <Queue />
        </TabPane>
        <TabPane tab="Send Email" key="4">
          <SendEmail />
        </TabPane>
      </Tabs>
    </ProCard>
  );
};

export default EmailManagement;

  {/* <Modal
        title={selectedTemplate ? 'Edit Template' : 'Create Template'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSave}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Template Name" rules={[{ required: true, message: 'Please input the template name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="subject" label="Subject" rules={[{ required: true, message: 'Please input the subject!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="provider" label="Select Provider">
            <Select onChange={(value) => setEditor(value)}>
              <Option value="ckeditor">CKEditor</Option>
              <Option value="beefree">BeeFree</Option>
            </Select>
          </Form.Item>
          <Form.Item name="body" label="Template Body">
            {editor === 'ckeditor' && (
              <CKEditor
                editor={ClassicEditor}
                data={form.getFieldValue('body')}
                onChange={(event, editor) => form.setFieldsValue({ body: editor.getData() })}
              />
            )}
            {editor === 'beefree' && (
              <Input.TextArea rows={10} />
            )}
          </Form.Item>
        </Form>
      </Modal> */}