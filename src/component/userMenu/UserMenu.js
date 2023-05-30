import React from "react";
import "./UserMenu.css";
import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h2>User Panel</h2>
          <Link
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </Link>
          <Link
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserMenu;