import React from "react";
import { BiCategory, BiUser} from "react-icons/bi";
import { AiOutlineUnorderedList } from "react-icons/ai";
import {MdCreate} from "react-icons/md"
import { TbHandClick, TbReportAnalytics, TbUserSearch } from "react-icons/tb";
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
          <AiOutlineUnorderedList/> Products
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
           <TbReportAnalytics/> Analytics
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
            activeClassName="active"
          >
           <MdCreate/> Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
            activeClassName="active"
          >
           <TbUserSearch/> Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
