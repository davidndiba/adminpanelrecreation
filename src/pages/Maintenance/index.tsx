// import React from 'react';
// import { ProCard } from '@ant-design/pro-components';
// import { Typography, Divider, Card, List } from 'antd'; // Import from antd

// const { Title, Paragraph } = Typography;

// const DataBackupAndSystemInfo = () => {
//   return (
//     <div style={{ padding: '24px' }}>
//       {/* Data Backup Information */}
//       <ProCard title="Data Backup" bordered>
//         <Title level={3}>Why Data Backup is Crucial</Title>
//         <Paragraph>
//           Data backup is a fundamental practice to ensure the safety and integrity of your data. Regular backups protect against data loss caused by system failures, accidental deletions, or cyber-attacks. Implementing a robust backup strategy helps in quick recovery and minimizes downtime.
//         </Paragraph>
//         <Title level={4}>How to Perform Data Backup</Title>
//         <Paragraph>
//           Follow these steps to ensure your data is backed up effectively:
//         </Paragraph>
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
//         />
//         <Paragraph>
//           Regularly review and update your backup strategy to adapt to changing data needs and technology advancements.
//         </Paragraph>
//       </ProCard>

//       <Divider />

//       {/* System Information */}
//       <ProCard title="System Information" bordered>
//         <Title level={3}>System Overview</Title>
//         <Card>
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
//         <Card style={{ marginTop: '16px' }}>
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
//     </div>
//   );
// };

// export default DataBackupAndSystemInfo;
import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Divider, Card, List, Button, Space, Modal, message } from 'antd'; // Import from antd
import { CloudUploadOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const DataBackupAndSystemInfo = () => {
  const [isBackupModalVisible, setIsBackupModalVisible] = React.useState(false);

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
          Data backup is a fundamental practice to ensure the safety and integrity of your data. Regular backups protect against data loss caused by system failures, accidental deletions, or cyber-attacks. Implementing a robust backup strategy helps in quick recovery and minimizes downtime.
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
            'Keep backups secure and accessible, with encryption if possible.'
          ]}
          renderItem={item => <List.Item>{item}</List.Item>}
          style={{ marginBottom: '16px' }}
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
        <Card style={{ marginBottom: '16px' }}>
          <Title level={4}>Tech Stack</Title>
          <List
            size="small"
            bordered
            dataSource={[
              'Frontend: React with Ant Design Pro',
              'Backend: Node.js with Express',
              'Database: MongoDB',
              'Server: Nginx',
              'Cloud Provider: AWS'
            ]}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </Card>
        <Card>
          <Title level={4}>Deployment Details</Title>
          <List
            size="small"
            bordered
            dataSource={[
              'Version Control: Git',
              'CI/CD Pipeline: GitHub Actions',
              'Monitoring: New Relic',
              'Logging: Loggly'
            ]}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </Card>
      </ProCard>

      {/* Backup Confirmation Modal */}
      <Modal
        title="Confirm Data Backup"
        visible={isBackupModalVisible}
        onOk={handleBackup}
        onCancel={() => setIsBackupModalVisible(false)}
      >
        <Paragraph>
          Are you sure you want to start the data backup process? This may take some time depending on the size of your data.
        </Paragraph>
      </Modal>
    </div>
  );
};

export default DataBackupAndSystemInfo;
