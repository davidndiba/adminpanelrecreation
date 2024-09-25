import React, { useState, useEffect } from 'react';
import { Table, Checkbox, Button, message, Modal } from 'antd';
import { request } from 'umi';

interface Role {
  id: string;
  name: string;
}

interface Permission {
  id: string;
  name: string;
}

const PermissionsManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [permissionsByRole, setPermissionsByRole] = useState<Record<string, Set<string>>>({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch roles
        const rolesResponse = await request('/roles', { method: 'GET' });
        if (!rolesResponse.data) {
          throw new Error('No roles data');
        }
        setRoles(rolesResponse.data);

        // Fetch permissions
        const permissionsResponse = await request('/permissions', { method: 'GET' });
        if (!permissionsResponse.data || !permissionsResponse.data.data || !Array.isArray(permissionsResponse.data.data)) {
          throw new Error('Invalid permissions data');
        }
        setPermissions(permissionsResponse.data.data);

        // Initialize permissionsByRole with current permissions
        const initialPermissionsByRole = rolesResponse.data.reduce((acc: Record<string, Set<string>>, role: Role) => {
          acc[role.id] = new Set(); // Initialize with empty Set
          return acc;
        }, {});
        setPermissionsByRole(initialPermissionsByRole);
      } catch (error) {
        message.error(`Failed to fetch data: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch roles
      const rolesResponse = await request('/roles', { method: 'GET' });
      if (!rolesResponse.data) {
        throw new Error('No roles data');
      }
      setRoles(rolesResponse.data);

      // Fetch permissions
      const permissionsResponse = await request('/permissions', { method: 'GET' });
      if (!permissionsResponse.data || !permissionsResponse.data.data || !Array.isArray(permissionsResponse.data.data)) {
        throw new Error('Invalid permissions data');
      }
      setPermissions(permissionsResponse.data.data);

      // Initialize permissionsByRole with current permissions
      const updatedPermissionsByRole = rolesResponse.data.reduce((acc: Record<string, Set<string>>, role: Role) => {
        acc[role.id] = new Set(); // Initialize with empty Set
        return acc;
      }, {});
      setPermissionsByRole(updatedPermissionsByRole);
    } catch (error) {
      message.error(`Failed to fetch data: ${error.message}`);
    }
  };

  const handleCheckboxChange = async (roleId: string, permissionId: string, checked: boolean) => {
    try {
      // Fetch current permissions for the role
      const rolePermissions = permissionsByRole[roleId] || new Set<string>();

      // Update permissions based on checkbox state
      const updatedPermissions = new Set(rolePermissions);
      if (checked) {
        updatedPermissions.add(permissionId);
      } else {
        updatedPermissions.delete(permissionId);
      }

      // Send the updated permissions to the server
      const response = await request(`/roles/${roleId}`, {
        method: 'PUT',
        data: {
          permissions: Array.from(updatedPermissions),
        },
      });

      console.log('Server response:', response); // Log the server response for debugging

      // Check if the response is successful and contains updated data
      if (response.success) {
        // Update state with the new permissions
        setPermissionsByRole(prev => ({
          ...prev,
          [roleId]: updatedPermissions,
        }));
        message.success('Permissions updated successfully');

        // Refetch data to ensure frontend reflects updates
        await fetchData(); // Make sure fetchData() is implemented to refetch the roles and permissions
      } else {
        throw new Error(response.message || 'Failed to update permissions');
      }
    } catch (error) {
      message.error(`Failed to update permissions: ${error.message}`);
    }
  };

  const columns = [
    {
      title: 'Permission',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span>{text}</span>,
    },
    ...roles.map(role => ({
      title: role.name,
      key: role.id,
      render: (permission: Permission) => (
        <Checkbox
          checked={permissionsByRole[role.id]?.has(permission.id) || false}
          onChange={(e) => handleCheckboxChange(role.id, permission.id, e.target.checked)}
        />
      ),
    })),
  ];

  const dataSource = permissions.map(permission => ({
    key: permission.id,
    ...permission,
  }));

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        scroll={{ x: 'max-content' }}
        rowClassName={(record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
        style={{ border: '1px solid #f0f0f0', borderRadius: '4px' }} // Table border and rounded corners
      />

      <Modal
        title="Manage Permissions"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {/* Modal content here */}
      </Modal>
    </div>
  );
};

export default PermissionsManagement;
