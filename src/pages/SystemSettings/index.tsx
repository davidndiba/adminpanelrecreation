// import React from 'react';
// import { PageContainer } from '@ant-design/pro-components';
// import SystemSettings from './Components/SystemSetting';
// import GeneralSettings from './Components/GeneralSettings';
// import EmailSettings from './Components/EmailSetting';


// const Settings = () => (
//   <PageContainer>
//     {/* System Settings at the top */}
//     <SystemSettings />
    
//     {/* General Settings below the System Settings */}
//     <div style={{ marginTop: 24 }}>
//       <GeneralSettings />
//     </div>
    
//     {/* Email Settings below the General Settings */}
//     <div style={{ marginTop: 24 }}>
//       <EmailSettings />
//     </div>
//   </PageContainer>
// );

// export default Settings;
// import { PageContainer } from '@ant-design/pro-components';
// import SystemSettings from './SystemSetting'; // Ensure the path is correct
// import GeneralSettings from './GeneralSettings'; // Ensure the path is correct
// import EmailSettings from './EmailSettings'; // Ensure the path is correct
// import SecuritySettings from './SecuritySettings';

// const Settings = () => (
//   <PageContainer>
//     {/* System Settings at the top */}
//     <SystemSettings />
    
//     {/* General Settings below the System Settings */}
//     <div style={{ marginTop: 24 }}>
//       <GeneralSettings />
//     </div>
    
//     {/* Email Settings below the General Settings */}
//     <div style={{ marginTop: 24 }}>
//       <EmailSettings />
//     </div>

//      {/* Security Settings below the General Settings */}
//      <div style={{ marginTop: 24 }}>
//       <SecuritySettings />
//     </div>
//   </PageContainer>
// );

// export default Settings;
import React from 'react';
import { Outlet } from 'umi';
import { PageContainer } from '@ant-design/pro-components';
import { Menu } from 'antd';
import { useLocation, Link } from 'umi';

const SystemSettingsLayout = () => {
  const location = useLocation();

  return (
    <PageContainer>
      <div style={{ display: 'flex' }}>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{ width: 200 }}
        >
          <Menu.Item key="/system-settings/generalsettings">
            <Link to="/system-settings/generalsettings">General Settings</Link>
          </Menu.Item>
          <Menu.Item key="/system-settings/emailsettings">
            <Link to="/system-settings/emailsettings">Email Settings</Link>
          </Menu.Item>
          <Menu.Item key="/system-settings/securitysettings">
            <Link to="/system-settings/securitysettings">Security Settings</Link>
          </Menu.Item>
        </Menu>
        <div style={{ flex: 1, marginLeft: 24 }}>
          <Outlet /> {/* Render the nested route components here */}
        </div>
      </div>
    </PageContainer>
  );
};

export default SystemSettingsLayout;
