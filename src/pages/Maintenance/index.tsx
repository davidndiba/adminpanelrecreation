// import React from 'react';
// import { ProCard } from '@ant-design/pro-components';
// import { Typography, Divider, Card, List, Button, Space, Modal, message } from 'antd'; // Import from antd
// import { CloudUploadOutlined } from '@ant-design/icons';

// const { Title, Paragraph } = Typography;

// const DataBackupAndSystemInfo = () => {
//   const [isBackupModalVisible, setIsBackupModalVisible] = React.useState(false);

//   const handleBackup = () => {
//     // Implement backup initiation logic here
//     setIsBackupModalVisible(false);
//     message.success('Backup process initiated successfully.');
//   };

//   const showBackupModal = () => {
//     setIsBackupModalVisible(true);
//   };

//   return (
//     <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
//       {/* Data Backup Information */}
//       <ProCard title="Data Backup" bordered>
//         <Title level={3}>Why Data Backup is Crucial</Title>
//         <Paragraph>
//           Data backup is a fundamental practice to ensure the safety and integrity of your data. Regular backups protect against data loss caused by system failures, accidental deletions, or cyber-attacks. Implementing a robust backup strategy helps in quick recovery and minimizes downtime.
//         </Paragraph>
//         <Title level={4}>How to Perform Data Backup</Title>
//         <List
//           size="small"
//           bordered
//           dataSource={[
//             'Identify the critical data that needs to be backed up.',
//             'Choose a reliable backup solution that fits your needs (e.g., cloud storage, local drives).',
//             'Schedule regular backups to ensure data is up-to-date.',
//             'Test your backups periodically to ensure they can be restored successfully.',
//             'Keep backups secure and accessible, with encryption if possible.'
//           ]}
//           renderItem={item => <List.Item>{item}</List.Item>}
//           style={{ marginBottom: '16px' }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             icon={<CloudUploadOutlined />}
//             size="large"
//             onClick={showBackupModal}
//           >
//             Start Data Backup
//           </Button>
//         </Space>
//       </ProCard>

//       <Divider />

//       {/* System Information */}
//       <ProCard title="System Information" bordered>
//         <Title level={3}>System Overview</Title>
//         <Card style={{ marginBottom: '16px' }}>
//           <Title level={4}>Tech Stack</Title>
//           <List
//             size="small"
//             bordered
//             dataSource={[
//               'Frontend: React with Ant Design Pro',
//               'Backend: Node.js with Express',
//               'Database: MongoDB',
//               'Server: Nginx',
//               'Cloud Provider: AWS'
//             ]}
//             renderItem={item => <List.Item>{item}</List.Item>}
//           />
//         </Card>
//         <Card>
//           <Title level={4}>Deployment Details</Title>
//           <List
//             size="small"
//             bordered
//             dataSource={[
//               'Version Control: Git',
//               'CI/CD Pipeline: GitHub Actions',
//               'Monitoring: New Relic',
//               'Logging: Loggly'
//             ]}
//             renderItem={item => <List.Item>{item}</List.Item>}
//           />
//         </Card>
//       </ProCard>

//       {/* Backup Confirmation Modal */}
//       <Modal
//         title="Confirm Data Backup"
//         visible={isBackupModalVisible}
//         onOk={handleBackup}
//         onCancel={() => setIsBackupModalVisible(false)}
//       >
//         <Paragraph>
//           Are you sure you want to start the data backup process? This may take some time depending on the size of your data.
//         </Paragraph>
//       </Modal>
//     </div>
//   );
// };

// export default DataBackupAndSystemInfo;
// import React, { useState, useEffect } from 'react';
// import { ProCard } from '@ant-design/pro-components';
// import { Typography, Divider, Card, List, Button, Space, Modal, message } from 'antd';
// import { CloudUploadOutlined } from '@ant-design/icons';
// import { request } from 'umi'; // Import request from umi for API calls

// const { Title, Paragraph } = Typography;

// const DataBackupAndSystemInfo = () => {
//   const [isBackupModalVisible, setIsBackupModalVisible] = useState(false);
//   const [systemInfo, setSystemInfo] = useState<any>(null);

//   // Fetch system information from the endpoint
//   useEffect(() => {
//     const fetchSystemInfo = async () => {
//       try {
//         const response = await request('/system-info');
//         if (response.success === "true") {
//           setSystemInfo(response.data);
//         } else {
//           message.error(response.message || 'Failed to fetch system information');
//         }
//       } catch (error) {
//         message.error('Failed to fetch system information');
//         console.error(error);
//       }
//     };

//     fetchSystemInfo();
//   }, []);

//   const handleBackup = () => {
//     // Implement backup initiation logic here
//     setIsBackupModalVisible(false);
//     message.success('Backup process initiated successfully.');
//   };

//   const showBackupModal = () => {
//     setIsBackupModalVisible(true);
//   };

//   return (
//     <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
//       {/* Data Backup Information */}
//       <ProCard title="Data Backup" bordered>
//         <Title level={3}>Why Data Backup is Crucial</Title>
//         <Paragraph>
//           Data backup is a fundamental practice to ensure the safety and integrity of your data. Regular backups protect against data loss caused by system failures, accidental deletions, or cyber-attacks. Implementing a robust backup strategy helps in quick recovery and minimizes downtime.
//         </Paragraph>
//         <Title level={4}>How to Perform Data Backup</Title>
//         <List
//           size="small"
//           bordered
//           dataSource={[
//             'Identify the critical data that needs to be backed up.',
//             'Choose a reliable backup solution that fits your needs (e.g., cloud storage, local drives).',
//             'Schedule regular backups to ensure data is up-to-date.',
//             'Test your backups periodically to ensure they can be restored successfully.',
//             'Keep backups secure and accessible, with encryption if possible.'
//           ]}
//           renderItem={item => <List.Item>{item}</List.Item>}
//           style={{ marginBottom: '16px' }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             icon={<CloudUploadOutlined />}
//             size="large"
//             onClick={showBackupModal}
//           >
//             Start Data Backup
//           </Button>
//         </Space>
//       </ProCard>

//       <Divider />

//       {/* System Information */}
//       <ProCard title="System Information" bordered>
//         <Title level={3}>System Overview</Title>
//         {systemInfo ? (
//           <>
//             <Card style={{ marginBottom: '16px' }}>
//               <Title level={4}>Tech Stack</Title>
//               <List
//                 size="small"
//                 bordered
//                 dataSource={[
//                   `Document Root Folder: ${systemInfo.document_root_folder}`,
//                   `Laravel Version: ${systemInfo.laravel_version}`,
//                   `PHP Version: ${systemInfo.php_version}`,
//                   `IP Address: ${systemInfo.ip_address}`,
//                   `System Server Host: ${systemInfo.system_server_host}`,
//                   `System Version: ${systemInfo.system_version}`,
//                   `Application Environment: ${systemInfo.application_environment}`,
//                   `Database Type: ${systemInfo.database_type}`,
//                   `Database Version: ${systemInfo.database_version}`
//                 ]}
//                 renderItem={item => <List.Item>{item}</List.Item>}
//               />
//             </Card>
//           </>
//         ) : (
//           <Paragraph>Loading system information...</Paragraph>
//         )}
//       </ProCard>

//       {/* Backup Confirmation Modal */}
//       <Modal
//         title="Confirm Data Backup"
//         visible={isBackupModalVisible}
//         onOk={handleBackup}
//         onCancel={() => setIsBackupModalVisible(false)}
//       >
//         <Paragraph>
//           Are you sure you want to start the data backup process? This may take some time depending on the size of your data.
//         </Paragraph>
//       </Modal>
//     </div>
//   );
// };

// export default DataBackupAndSystemInfo;
import { CloudUploadOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Divider,
  List,
  Modal,
  Space,
  Typography,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import { request } from 'umi'; // Import request from umi for API calls

const { Title, Paragraph } = Typography;

const DataBackupAndSystemInfo = () => {
  const [isBackupModalVisible, setIsBackupModalVisible] = useState(false);
  const [systemInfo, setSystemInfo] = useState<any>(null);

  // Fetch system information from the endpoint
  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const response = await request('/system-info');
        if (response.success === 'true') {
          setSystemInfo(response.data);
        } else {
          message.error(
            response.message || 'Failed to fetch system information',
          );
        }
      } catch (error) {
        message.error('Failed to fetch system information');
        console.error(error);
      }
    };

    fetchSystemInfo();
  }, []);

  const handleBackup = () => {
    // Implement backup initiation logic here
    setIsBackupModalVisible(false);
    message.success('Backup process initiated successfully.');
  };

  const showBackupModal = () => {
    setIsBackupModalVisible(true);
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
      {/* Data Backup Information */}
      <ProCard title="Data Backup" bordered>
        <Title level={3}>Why Data Backup is Crucial</Title>
        <Paragraph>
          Data backup is a fundamental practice to ensure the safety and
          integrity of your data. Regular backups protect against data loss
          caused by system failures, accidental deletions, or cyber-attacks.
          Implementing a robust backup strategy helps in quick recovery and
          minimizes downtime.
        </Paragraph>
        <Title level={4}>How to Perform Data Backup</Title>
        <List
          size="small"
          bordered
          dataSource={[
            'Identify the critical data that needs to be backed up.',
            'Choose a reliable backup solution that fits your needs (e.g., cloud storage, local drives).',
            'Schedule regular backups to ensure data is up-to-date.',
            'Test your backups periodically to ensure they can be restored successfully.',
            'Keep backups secure and accessible, with encryption if possible.',
          ]}
          renderItem={(item) => (
            <List.Item
              style={{
                padding: '16px',
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
              }}
            >
              {item}
            </List.Item>
          )}
          style={{ backgroundColor: '#ffffff' }}
        />
        <Space>
          <Button
            type="primary"
            icon={<CloudUploadOutlined />}
            size="large"
            onClick={showBackupModal}
          >
            Start Data Backup
          </Button>
        </Space>
      </ProCard>

      <Divider />

      {/* System Information */}
      <ProCard title="System Information" bordered>
        <Title level={3}>System Overview</Title>
        {systemInfo ? (
          <>
            <Card style={{ marginBottom: '16px' }}>
              <Title level={4}>Tech Stack</Title>
              <List
                size="small"
                bordered
                dataSource={[
                  `Document Root Folder: ${systemInfo.document_root_folder}`,
                  `Laravel Version: ${systemInfo.laravel_version}`,
                  `PHP Version: ${systemInfo.php_version}`,
                  `IP Address: ${systemInfo.ip_address}`,
                  `System Server Host: ${systemInfo.system_server_host}`,
                  `System Version: ${systemInfo.system_version}`,
                  `Application Environment: ${systemInfo.application_environment}`,
                  `Database Type: ${systemInfo.database_type}`,
                  `Database Version: ${systemInfo.database_version}`,
                ]}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      padding: '16px',
                      border: '1px solid #d9d9d9',
                      borderRadius: '4px',
                      marginBottom: '8px',
                      backgroundColor: '#fafafa',
                    }}
                  >
                    {item}
                  </List.Item>
                )}
                style={{ backgroundColor: '#ffffff' }}
              />
            </Card>
          </>
        ) : (
          <Paragraph>Loading system information...</Paragraph>
        )}
      </ProCard>

      {/* Backup Confirmation Modal */}
      <Modal
        title="Confirm Data Backup"
        visible={isBackupModalVisible}
        onOk={handleBackup}
        onCancel={() => setIsBackupModalVisible(false)}
      >
        <Paragraph>
          Are you sure you want to start the data backup process? This may take
          some time depending on the size of your data.
        </Paragraph>
      </Modal>
    </div>
  );
};

export default DataBackupAndSystemInfo;
