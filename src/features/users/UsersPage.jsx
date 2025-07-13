import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser } from "./usersSlice";
import { toast } from "react-toastify";

function UsersPage() {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const [newUser, setNewUser] = useState({
    name: "",
    role: "Employee",
    status: "Active",
  });

  const handleAdd = () => {
    if (!newUser.name.trim()) {
      toast.error("Please enter user name");
      return;
    }
    const id = Date.now();
    const lastActivity = new Date().toLocaleString();
    dispatch(addUser({ ...newUser, id, lastActivity }));
    toast.success("User added successfully");
    setNewUser({ name: "", role: "Employee", status: "Active" });
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    toast.success("User deleted");
  };

  return (
    <div className="page-container">
      <h1 className="page-header">User Management (Admin Only)</h1>

      <div className="form-container">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="input-field"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="input-field"
        >
          <option>Admin</option>
          <option>Manager</option>
          <option>Employee</option>
        </select>
        <select
          value={newUser.status}
          onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
          className="input-field"
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <button onClick={handleAdd} className="btn bg-blue-600">
          Add User
        </button>
      </div>

      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Activity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No users found.
                </td>
              </tr>
            )}
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>{user.lastActivity}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersPage;
