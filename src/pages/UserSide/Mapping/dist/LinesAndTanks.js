"use strict";
// import {
//     ActionType,
//     ProColumns,
//     ProTable,
//   } from '@ant-design/pro-components';
//   import { Button, Card, Col, Divider, message, Popconfirm, Row, Space, Tooltip, Typography } from 'antd';
//   import { DeleteOutlined } from '@ant-design/icons';
//   import React, { useRef } from 'react';
//   import { request } from 'umi';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
//   const { Title } = Typography;
//   interface LineTank {
//     id: string;
//     job_area: string;
//     tank: string;
//   }
//   const LinesTanks: React.FC = () => {
//     const tableActionRef = useRef<ActionType>();
//     const handleDelete = async (id: string) => {
//       try {
//         await request(`/lines-tanks/${id}`, { method: 'DELETE' });
//         message.success('Line/Tank deleted successfully.');
//         tableActionRef.current?.reload();
//       } catch (error) {
//         message.error('Failed to delete line/tank.');
//       }
//     };
//     const columns: ProColumns<LineTank>[] = [
//       {
//         title: 'Job Areas',
//         dataIndex: 'job_area',
//         key: 'job_area',
//       },
//       {
//         title: 'Tanks',
//         dataIndex: 'tank',
//         key: 'tank',
//       },
//       {
//         title: 'Actions',
//         key: 'actions',
//         render: (_, record) => (
//           <Space size="middle">
//             <Tooltip title="Delete">
//               <Popconfirm
//                 title="Are you sure you want to delete this line/tank?"
//                 onConfirm={() => handleDelete(record.id)}
//                 okText="Yes"
//                 cancelText="No"
//               >
//                 <Button icon={<DeleteOutlined />} type="link" danger />
//               </Popconfirm>
//             </Tooltip>
//           </Space>
//         ),
//       },
//     ];
//     return (
//       <div style={{ padding: '20px' }}>
//         <Row gutter={16} style={{ marginBottom: '20px' }}>
//           <Col span={8}>
//             <Card bordered style={{ textAlign: 'center' }}>
//               <Title level={4}>Lines & Tanks</Title>
//               <Divider />
//               <Button
//                 type="primary"
//                 style={{ width: '100%', backgroundColor: '#1890ff', borderColor: '#1890ff' }}
//               >
//                 Add Line/Tank
//               </Button>
//             </Card>
//           </Col>
//         </Row>
//         <ProTable<LineTank>
//           headerTitle="Lines & Tanks"
//           actionRef={tableActionRef}
//           rowKey="id"
//           search={{
//             labelWidth: 'auto',
//             searchText: 'Search...',
//             resetText: 'Reset',
//           }}
//           pagination={{
//             pageSize: 10,
//             showQuickJumper: true,
//             showSizeChanger: true,
//           }}
//           request={async (params) => {
//             const response = await request('/lines-tanks', { params });
//             return {
//               data: response.data || [],
//               total: response.total || 0,
//             };
//           }}
//           columns={columns}
//           toolBarRender={false}
//           bordered
//           style={{ backgroundColor: '#fff', borderRadius: '4px' }}
//         />
//       </div>
//     );
//   };
//   export default LinesTanks;
// import React, { useEffect, useRef, useState } from 'react';
// import {
//   ActionType,
//   ModalForm,
//   ProColumns,
//   ProTable,
//   ProFormText,
// } from '@ant-design/pro-components';
// import { Button, Card, Divider, message, Popconfirm, Row, Space, Tooltip, Typography } from 'antd';
// import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
// import { request } from 'umi';
// const { Title } = Typography;
// interface LineTank {
//   id: string;
//   job_area: string;
//   tank: string;
//   created_on: string;
// }
// const LinesAndTanks: React.FC = () => {
//   const tableActionRef = useRef<ActionType>();
//   const [visible, setVisible] = useState(false);
//   const [formValues, setFormValues] = useState<LineTank | undefined>(undefined);
//   const [data, setData] = useState<LineTank[]>([]);
//   const [total, setTotal] = useState(0);
//   const fetchData = async (params: any) => {
//     try {
//       const response = await request('/job-lines', { params });
//       if (Array.isArray(response.data)) {
//         setData(response.data);
//         setTotal(response.total || response.data.length);
//       } else {
//         console.error('Expected array but got:', response.data);
//         setData([]);
//         setTotal(0);
//       }
//     } catch (error) {
//       console.error('Failed to fetch data:', error);
//       setData([]);
//       setTotal(0);
//     }
//   };
//   useEffect(() => {
//     fetchData({});
//   }, []);
//   const handleEdit = (record: LineTank) => {
//     setFormValues(record);
//     setVisible(true);
//   };
//   const handleDelete = async (id: string) => {
//     try {
//       await request(`/job-lines/${id}`, { method: 'DELETE' });
//       message.success('Line/Tank deleted successfully.');
//       fetchData({});
//       tableActionRef.current?.reload();
//     } catch (error) {
//       message.error('Failed to delete line/tank.');
//     }
//   };
//   const columns: ProColumns<LineTank>[] = [
//     {
//       title: 'Job Area',
//       dataIndex: 'job_area',
//       key: 'job_area',
//     },
//     {
//       title: 'Tank',
//       dataIndex: 'tank',
//       key: 'tank',
//     },
//     {
//       title: 'Created At',
//       dataIndex: 'created_on',
//       key: 'created_on',
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="middle">
//           <Tooltip title="Edit">
//             <Button
//               icon={<EditOutlined />}
//               type="link"
//               onClick={() => handleEdit(record)}
//             />
//           </Tooltip>
//           <Tooltip title="Delete">
//             <Popconfirm
//               title="Are you sure you want to delete this line/tank?"
//               onConfirm={() => handleDelete(record.id)}
//               okText="Yes"
//               cancelText="No"
//             >
//               <Button icon={<DeleteOutlined />} type="link" danger />
//             </Popconfirm>
//           </Tooltip>
//         </Space>
//       ),
//     },
//   ];
//   return (
//     <div style={{ padding: '20px' }}>
//       <Card bordered={false} style={{ borderRadius: '8px', backgroundColor: '#f0f2f5', padding: '20px' }}>
//         <Row justify="space-between" style={{ marginBottom: '20px' }}>
//           <Title level={4}>Manage Lines & Tanks</Title>
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={() => {
//               setFormValues(undefined);
//               setVisible(true);
//             }}
//             style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
//           >
//             Add Line/Tank
//           </Button>
//         </Row>
//         <Divider />
//         <ProTable<LineTank>
//           headerTitle={false}
//           actionRef={tableActionRef}
//           rowKey="id"
//           dataSource={data}
//           pagination={{ total, pageSize: 10 }}
//           columns={columns}
//           bordered
//         />
//       </Card>
//       <ModalForm
//         title={formValues ? 'Edit Line/Tank' : 'Add Line/Tank'}
//         visible={visible}
//         onVisibleChange={setVisible}
//         initialValues={formValues}
//         onFinish={async (values) => {
//           try {
//             if (formValues?.id) {
//               await request(`/job-lines/${formValues.id}`, {
//                 method: 'PUT',
//                 data: values,
//               });
//               message.success('Line/Tank updated successfully.');
//             } else {
//               await request('/job-lines', { method: 'POST', data: values });
//               message.success('Line/Tank added successfully.');
//             }
//             setVisible(false);
//             fetchData({});
//             tableActionRef.current?.reload();
//           } catch (error) {
//             message.error('Failed to save line/tank.');
//           }
//         }}
//       >
//         <ProFormText
//           name="job_area"
//           label="Job Area"
//           placeholder="Enter job area"
//           rules={[{ required: true, message: 'Job Area is required.' }]}
//         />
//         <ProFormText
//           name="tank"
//           label="Tank"
//           placeholder="Enter tank"
//           rules={[{ required: true, message: 'Tank is required.' }]}
//         />
//       </ModalForm>
//     </div>
//   );
// };
// export default LinesAndTanks;
// import React, { useEffect, useRef, useState } from 'react';
// import {
//   ActionType,
//   ModalForm,
//   ProColumns,
//   ProTable,
//   ProFormText,
//   ProFormSelect,
// } from '@ant-design/pro-components';
// import { Button, Card, Divider, message, Popconfirm, Row, Space, Tooltip, Typography, Tabs, Col } from 'antd';
// import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
// import { request } from 'umi';
// const { Title } = Typography;
// const { TabPane } = Tabs;
// interface LineTank {
//   id: string;
//   job_area: string;
//   tank: string;
//   created_on: string;
//   job_type_id: string; // Add this line
// }
// const LinesAndTanks: React.FC = () => {
//   const tableActionRef = useRef<ActionType>();
//   const [visible, setVisible] = useState(false);
//   const [formValues, setFormValues] = useState<LineTank | undefined>(undefined);
//   const [data, setData] = useState<LineTank[]>([]);
//   const [total, setTotal] = useState(0);
//   const [jobTypes, setJobTypes] = useState([]);
//   const [activeJobType, setActiveJobType] = useState<string | undefined>(undefined);
//   useEffect(() => {
//     const fetchJobTypes = async () => {
//       try {
//         const response = await request('/job-types');
//         setJobTypes(Array.isArray(response.data.data) ? response.data.data : []);
//         if (response.data.data.length > 0) {
//           setActiveJobType(response.data.data[0].id); // Set default job type
//         }
//       } catch (error) {
//         message.error('Failed to fetch job types.');
//       }
//     };
//     fetchJobTypes();
//   }, []);
//   const fetchData = async (params: any) => {
//     try {
//       const response = await request('/job-lines', { params });
//       if (Array.isArray(response.data)) {
//         setData(response.data);
//         setTotal(response.total || response.data.length);
//       } else {
//         console.error('Expected array but got:', response.data);
//         setData([]);
//         setTotal(0);
//       }
//     } catch (error) {
//       console.error('Failed to fetch data:', error);
//       setData([]);
//       setTotal(0);
//     }
//   };
//   useEffect(() => {
//     fetchData({});
//   }, []);
//   const handleEdit = (record: LineTank) => {
//     setFormValues(record);
//     setVisible(true);
//   };
//   const handleDelete = async (id: string) => {
//     try {
//       await request(`/job-lines/${id}`, { method: 'DELETE' });
//       message.success('Line/Tank deleted successfully.');
//       fetchData({});
//       tableActionRef.current?.reload();
//     } catch (error) {
//       message.error('Failed to delete line/tank.');
//     }
//   };
//   const columns: ProColumns<LineTank>[] = [
//     {
//       title: 'Job Area',
//       dataIndex: 'job_area',
//       key: 'job_area',
//     },
//     {
//       title: 'Tank',
//       dataIndex: 'tank',
//       key: 'tank',
//     },
//     {
//       title: 'Created At',
//       dataIndex: 'created_on',
//       key: 'created_on',
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="middle">
//           <Tooltip title="Edit">
//             <Button
//               icon={<EditOutlined />}
//               type="link"
//               onClick={() => handleEdit(record)}
//             />
//           </Tooltip>
//           <Tooltip title="Delete">
//             <Popconfirm
//               title="Are you sure you want to delete this line/tank?"
//               onConfirm={() => handleDelete(record.id)}
//               okText="Yes"
//               cancelText="No"
//             >
//               <Button icon={<DeleteOutlined />} type="link" danger />
//             </Popconfirm>
//           </Tooltip>
//         </Space>
//       ),
//     },
//   ];
//   return (
//     <div style={{ padding: '20px', backgroundColor: '#fff' }}>
//       <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Lines & Tanks</Title>
//       <Tabs activeKey={activeJobType} onChange={setActiveJobType}>
//         {jobTypes.map(type => (
//           <TabPane tab={type.name} key={type.id}>
//             {/* Tab content can be customized further if needed */}
//           </TabPane>
//         ))}
//       </Tabs>
//       <Row gutter={16} style={{ marginTop: '20px' }}>
//         <Col span={24}>
//           <Card bordered={false} style={{ backgroundColor: '#f0f2f5', padding: '20px' }}>
//             <Row justify="space-between" style={{ marginBottom: '20px' }}>
//               <Button
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 onClick={() => {
//                   setFormValues(undefined);
//                   setVisible(true);
//                 }}
//                 style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
//               >
//                 Add Line/Tank
//               </Button>
//             </Row>
//             <Divider />
//             <ProTable<LineTank>
//               headerTitle={false}
//               actionRef={tableActionRef}
//               rowKey="id"
//               dataSource={data}
//               pagination={{ total, pageSize: 10 }}
//               columns={columns}
//               bordered
//             />
//           </Card>
//         </Col>
//       </Row>
//       <ModalForm
//         title={formValues ? 'Edit Line/Tank' : 'Add Line/Tank'}
//         visible={visible}
//         onVisibleChange={setVisible}
//         initialValues={formValues}
//         onFinish={async (values) => {
//           try {
//             if (formValues?.id) {
//               await request(`/job-lines/${formValues.id}`, {
//                 method: 'PUT',
//                 data: values,
//               });
//               message.success('Line/Tank updated successfully.');
//             } else {
//               await request('/job-lines', { method: 'POST', data: values });
//               message.success('Line/Tank added successfully.');
//             }
//             setVisible(false);
//             fetchData({});
//             tableActionRef.current?.reload();
//           } catch (error) {
//             message.error('Failed to save line/tank.');
//           }
//         }}
//       >
//         <ProFormText
//           name="job_area"
//           label="Job Area"
//           placeholder="Enter job area"
//           rules={[{ required: true, message: 'Job Area is required.' }]}
//         />
//         <ProFormText
//           name="tank"
//           label="Tank"
//           placeholder="Enter tank"
//           rules={[{ required: true, message: 'Tank is required.' }]}
//         />
//         <ProFormSelect
//           name="job_type_id"
//           label="Job Type"
//           options={jobTypes.map(type => ({ label: type.name, value: type.id }))}
//           rules={[{ required: true, message: 'Job Type is required.' }]}
//         />
//       </ModalForm>
//     </div>
//   );
// };
// export default LinesAndTanks;
var react_1 = require("react");
var pro_components_1 = require("@ant-design/pro-components");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var umi_1 = require("umi");
var Title = antd_1.Typography.Title;
var TabPane = antd_1.Tabs.TabPane;
var LinesAndTanks = function () {
    var tableActionRef = react_1.useRef();
    var _a = react_1.useState([]), data = _a[0], setData = _a[1];
    var _b = react_1.useState(0), total = _b[0], setTotal = _b[1];
    var _c = react_1.useState([]), jobTypes = _c[0], setJobTypes = _c[1];
    var _d = react_1.useState([]), jobAreas = _d[0], setJobAreas = _d[1];
    var _e = react_1.useState(undefined), activeJobType = _e[0], setActiveJobType = _e[1];
    var _f = react_1.useState({ job_area: '', tank: '', job_type_id: '' }), newTank = _f[0], setNewTank = _f[1];
    react_1.useEffect(function () {
        var fetchJobTypes = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, umi_1.request('/job-types')];
                    case 1:
                        response = _a.sent();
                        setJobTypes(Array.isArray(response.data.data) ? response.data.data : []);
                        if (response.data.data.length > 0) {
                            setActiveJobType(response.data.data[0].id); // Set default job type
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        antd_1.message.error('Failed to fetch job types.');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchJobTypes();
    }, []);
    react_1.useEffect(function () {
        var fetchJobAreas = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!activeJobType)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, umi_1.request("/job-areas?job_type_id=" + activeJobType)];
                    case 2:
                        response = _a.sent();
                        setJobAreas(Array.isArray(response.data.data) ? response.data.data : []);
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        antd_1.message.error('Failed to fetch job areas.');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchJobAreas();
    }, [activeJobType]);
    var fetchData = function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request('/job-lines', { params: params })];
                case 1:
                    response = _a.sent();
                    if (Array.isArray(response.data)) {
                        setData(response.data);
                        setTotal(response.total || response.data.length);
                    }
                    else {
                        console.error('Expected array but got:', response.data);
                        setData([]);
                        setTotal(0);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error('Failed to fetch data:', error_3);
                    setData([]);
                    setTotal(0);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        fetchData({});
    }, []);
    var handleAddTank = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request('/job-lines', { method: 'POST', data: newTank })];
                case 1:
                    _a.sent();
                    antd_1.message.success('Line/Tank added successfully.');
                    fetchData({});
                    setNewTank({ job_area: '', tank: '', job_type_id: '' });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    antd_1.message.error('Failed to add line/tank.');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var columns = [
        {
            title: 'Job Area',
            dataIndex: 'job_area',
            key: 'job_area'
        },
        {
            title: 'Tank',
            dataIndex: 'tank',
            key: 'tank'
        },
        {
            title: 'Created At',
            dataIndex: 'created_on',
            key: 'created_on'
        },
        {
            title: 'Actions',
            key: 'actions',
            render: function (_, record) { return (react_1["default"].createElement(antd_1.Space, { size: "middle" },
                react_1["default"].createElement(antd_1.Tooltip, { title: "Edit" },
                    react_1["default"].createElement(antd_1.Button, { icon: react_1["default"].createElement(icons_1.EditOutlined, null), type: "link" })),
                react_1["default"].createElement(antd_1.Tooltip, { title: "Delete" },
                    react_1["default"].createElement(antd_1.Popconfirm, { title: "Are you sure you want to delete this line/tank?", onConfirm: function () { return handleDelete(record.id); }, okText: "Yes", cancelText: "No" },
                        react_1["default"].createElement(antd_1.Button, { icon: react_1["default"].createElement(icons_1.DeleteOutlined, null), type: "link", danger: true }))))); }
        },
    ];
    return (react_1["default"].createElement("div", { style: { padding: '20px', backgroundColor: '#fff' } },
        react_1["default"].createElement(Title, { level: 2, style: { textAlign: 'center', marginBottom: '20px' } }, "Manage Lines & Tanks"),
        react_1["default"].createElement(antd_1.Tabs, { activeKey: activeJobType, onChange: setActiveJobType }, jobTypes.map(function (type) { return (react_1["default"].createElement(TabPane, { tab: type.name, key: type.id })); })),
        react_1["default"].createElement(antd_1.Row, { gutter: 16, style: { marginTop: '20px' } },
            react_1["default"].createElement(antd_1.Col, { span: 24 },
                react_1["default"].createElement(antd_1.Card, { bordered: false, style: { backgroundColor: '#f0f2f5', padding: '20px' } },
                    react_1["default"].createElement(antd_1.Row, { justify: "space-between", style: { marginBottom: '20px' } },
                        react_1["default"].createElement(antd_1.Button, { type: "primary", icon: react_1["default"].createElement(icons_1.PlusOutlined, null), onClick: handleAddTank, style: { backgroundColor: '#1890ff', borderColor: '#1890ff' } }, "Add Line/Tank")),
                    react_1["default"].createElement(antd_1.Divider, null),
                    react_1["default"].createElement(pro_components_1.ProTable, { headerTitle: false, actionRef: tableActionRef, rowKey: "id", dataSource: data, pagination: { total: total, pageSize: 10 }, columns: columns, bordered: true }),
                    react_1["default"].createElement(antd_1.Divider, null),
                    react_1["default"].createElement(Title, { level: 4 }, "Add a New Tank"),
                    react_1["default"].createElement(pro_components_1.ProFormSelect, { name: "job_type_id", label: "Job Type", options: jobTypes.map(function (type) { return ({ label: type.name, value: type.id }); }), onChange: function (value) { return setNewTank(__assign(__assign({}, newTank), { job_type_id: value })); }, rules: [{ required: true, message: 'Job Type is required.' }], style: { marginBottom: '10px' } }),
                    react_1["default"].createElement(pro_components_1.ProFormSelect, { name: "job_area", label: "Job Area", options: jobAreas.map(function (area) { return ({ label: area.name, value: area.id }); }), onChange: function (value) { return setNewTank(__assign(__assign({}, newTank), { job_area: value })); }, rules: [{ required: true, message: 'Job Area is required.' }], style: { marginBottom: '10px' } }),
                    react_1["default"].createElement(pro_components_1.ProFormText, { name: "tank", label: "Tank", value: newTank.tank, onChange: function (e) { return setNewTank(__assign(__assign({}, newTank), { tank: e.target.value })); }, placeholder: "Enter tank", rules: [{ required: true, message: 'Tank is required.' }], style: { marginBottom: '10px' } }))))));
};
exports["default"] = LinesAndTanks;
