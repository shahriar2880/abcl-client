import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import AdminMenu from "../../component/adminMenu/AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import "./Users.css"

const Users = () => {
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useAuth();


  useEffect(() => {
    getUsers();
  }, []);
  if (auth?.user) {
    
   }
  const getUsers = async () => {
    try {
      const response = await axios.get("/api/v1/auth/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error while getting users");
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/api/v1/auth/users/${userId}`);
      getUsers();
      toast.success("User deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting user");
    }
  };

  const makeAdmin = async (userId) => {
    try {
      await axios.put(`/api/v1/auth/users/${userId}/make-admin`);
      getUsers();
      toast.success("User role updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error while updating user role");
    }
  };
  return (
    <Layout title={"Admin Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div>
              <h1>All Users</h1>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role === 1 ? "Admin" : "User"}</td>
                      <td>
                        <button onClick={() => deleteUser(user._id)}>
                          Delete
                        </button>
                        {!user.role && (
                          <button onClick={() => makeAdmin(user._id)}>
                            Make Admin
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
