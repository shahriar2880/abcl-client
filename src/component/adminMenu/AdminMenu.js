import { UpOutlined } from "@ant-design/icons";
import React from "react";
import { BiCategory, BiUser, BiUserPlus } from "react-icons/bi";
import { TbHandClick } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <NavLink
            to="/dashboard/admin/myProfile"
            className="list-group-item list-group-item-action"
            activeClassName="active"
          >
           <BiUser/> My Profile
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
            activeClassName="active"
          >
           <BiCategory/> Create category
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
            activeClassName="active"
          >
           Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
            activeClassName="active"
          >
           <TbHandClick/> Orders
          </NavLink>
          <NavLink
            to="/dashboard/admin/transactions"
            className="list-group-item list-group-item-action"
            activeClassName="active"
          >
            Analytics
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
            activeClassName="active"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
            activeClassName="active"
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
