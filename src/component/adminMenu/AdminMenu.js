import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
              <div className="list-group">
                  <h2>Admin Panel</h2>
          <NavLink to="/dashboard/admin/myProfile" className="list-group-item list-group-item-action" activeClassName="active">
            My Profile
          </NavLink>
          <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action" activeClassName="active">
            Create category
          </NavLink>
          <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action" activeClassName="active">
            Products
          </NavLink>
          <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action" activeClassName="active">
            Orders
          </NavLink>
          <NavLink to="/dashboard/admin/transactions" className="list-group-item list-group-item-action" activeClassName="active">
            Report
          </NavLink>
          <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action" activeClassName="active">
            Create Product
          </NavLink>
          <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action" activeClassName="active">Users</NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
