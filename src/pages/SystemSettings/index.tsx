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
import { PageContainer } from '@ant-design/pro-components';
import SystemSettings from './Components/SystemSetting'; // Ensure the path is correct
import GeneralSettings from './Components/GeneralSettings'; // Ensure the path is correct
import EmailSettings from './Components/EmailSetting'; // Ensure the path is correct
import SecuritySettings from './Components/SecuritySettings';

const Settings = () => (
  <PageContainer>
    {/* System Settings at the top */}
    <SystemSettings />
    
    {/* General Settings below the System Settings */}
    <div style={{ marginTop: 24 }}>
      <GeneralSettings />
    </div>
    
    {/* Email Settings below the General Settings */}
    <div style={{ marginTop: 24 }}>
      <EmailSettings />
    </div>

     {/* Security Settings below the General Settings */}
     <div style={{ marginTop: 24 }}>
      <SecuritySettings />
    </div>
  </PageContainer>
);

export default Settings;
