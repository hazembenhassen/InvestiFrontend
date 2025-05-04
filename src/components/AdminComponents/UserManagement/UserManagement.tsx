import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userManagement.scss";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import UserDetailsPopup from "../UserDetailsPopup/UserDetailsPopup";

interface User {
  userId: number;
  fullName: string;
  email: string;
  username: string | null;
  role: string;
  company_name: string | null;
  activity_field: string | null;
  address: string | null;
  type: string | null;
  statuts: string | null;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("authToken");
      console.log("Fetching users with token:", token); 

      const response = await axios.get<User[]>("http://localhost:8082/api/user/beneficiaries", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUserStatus = async (id: number, action: string) => {
    try {
      const token = localStorage.getItem("authToken");
      console.log("Updating user status with token:", token); 

      const urlMap: Record<string, string> = {
        ban: `http://localhost:8082/api/admin/users/${id}/ban`,
        unban: `http://localhost:8082/api/admin/users/${id}/unban`,
        activate: `http://localhost:8082/api/admin/users/${id}/activate`,
        deactivate: `http://localhost:8082/api/admin/users/${id}/deactivate`,
      };

      if (!urlMap[action]) {
        console.warn(`Unsupported action: ${action}`);
        return;
      }

      const response = await axios.patch(urlMap[action], null, {
        headers: {
          Authorization: `Bearer ${token}`, // Get the token from localStorage
        },
      });

      console.log("User status updated:", response); // Debug log to confirm successful update

      fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <div className="user-management">
      <AdminNavbar />
      <h2>User Management</h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Role</th>
              <th>Address</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => {
                console.log("Rendering user with ID:", user.userId);
                const status = user.statuts?.toUpperCase();
                return (
                  <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.username || "-"}</td>
                    <td>{user.role}</td>
                    <td>{user.address || "-"}</td>
                    <td>{user.type || "-"}</td>
                    <td className={status || "unknown"}>{status || "-"}</td>
                    <td>
                      <button className="view" onClick={() => setSelectedUser(user)}>
                        👁 View
                      </button>
                      <select
                        defaultValue=""
                        onChange={(e) => updateUserStatus(user.userId, e.target.value)}
                        className="status-dropdown"
                      >
                        <option value="" disabled>
                          Select Action
                        </option>
                        {status === "ACTIVE" && (
                          <>
                            <option value="ban">Ban</option>
                          </>
                        )}
                        {status === "BANNED" && <option value="unban">Unban</option>}
                        {status === "INACTIVE" && <option value="activate">Activate</option>}
                      </select>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9}>No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <UserDetailsPopup user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default UserManagement;
