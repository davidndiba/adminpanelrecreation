// import React,{ useState } from 'react';
// import { Segmented, Space } from 'antd';
// import { PageContainer } from '@ant-design/pro-components';
// import Users from './Components/users';
// import Roles from './Components/roles';
// import Permissions from './Components/permissions';


// const AdminPanel: React.FC = () => {
//   const [current, setCurrent] = useState('Users');

//   const handleTabChange = (value: string) => {
//     setCurrent(value);
//   };

//   return (
//     <PageContainer title={`Admin ${current}`}>
//       <div style={{ marginBottom: 16 }}>
//         <Segmented
//           size="middle"
//           onChange={handleTabChange}
//           style={{ fontWeight: 700 }}
//           options={['Users', 'Roles', 'Permissions']}
//         />
//       </div>
//       <Space direction="vertical" style={{ width: '100%' }}>
//         {current === 'Users' && <Users />}
//         {current === 'Roles' && <Roles />}
//         {current === 'Permissions' && <Permissions />}
//       </Space>
//     </PageContainer>
//   );
// };

// export default AdminPanel;
import React from 'react';
import { Tabs } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import Users from './Components/users';
import Roles from './Components/roles';
import Permissions from './Components/permissions';

const { TabPane } = Tabs;

const AdminPanel: React.FC = () => {
  return (
    <ProCard title="User Management" bordered>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Users" key="1">
          <Users />
        </TabPane>
        <TabPane tab="Roles" key="2">
          <Roles />
        </TabPane>
        <TabPane tab="Permissions" key="3">
          <Permissions />
        </TabPane>
      </Tabs>
    </ProCard>
  );
};

export default AdminPanel;
