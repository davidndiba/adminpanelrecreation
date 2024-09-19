"use strict";
exports.__esModule = true;
// 
var react_1 = require("react");
var antd_1 = require("antd");
var Settings_1 = require("./Settings");
var EmailTemplate_1 = require("./EmailTemplate");
var Queue_1 = require("./Queue");
var SendEmail_1 = require("./SendEmail");
var pro_components_1 = require("@ant-design/pro-components");
var TabPane = antd_1.Tabs.TabPane;
var EmailManagement = function () {
    return (react_1["default"].createElement(pro_components_1.ProCard, { title: "Email Management", bordered: true },
        react_1["default"].createElement(antd_1.Tabs, { defaultActiveKey: "1" },
            react_1["default"].createElement(TabPane, { tab: "Settings", key: "1" },
                react_1["default"].createElement(Settings_1["default"], null)),
            react_1["default"].createElement(TabPane, { tab: "Email Template", key: "2" },
                react_1["default"].createElement(EmailTemplate_1["default"], null)),
            react_1["default"].createElement(TabPane, { tab: "Queue", key: "3" },
                react_1["default"].createElement(Queue_1["default"], null)),
            react_1["default"].createElement(TabPane, { tab: "Send Email", key: "4" },
                react_1["default"].createElement(SendEmail_1["default"], null)))));
};
exports["default"] = EmailManagement;
{ /* <Modal
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
    </Modal> */
}
