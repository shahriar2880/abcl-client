import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { GiShoppingCart } from "react-icons/gi";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import SearchInput from "../form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge, Space } from "antd";
import {
  ShoppingCartOutlined
} from '@ant-design/icons';

const Header = () => {
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("LogOut Successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <div>
            <Link to="/" className="navbar-brand">
              <GiShoppingCart /> ABCL IT
            </Link>
            </div>
            <div className="ms-auto mb-2 mb-lg-0 ">
            <ul className="navbar-nav">
              <SearchInput></SearchInput>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Category
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li>
                        <Link
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          onClick={handleLogOut}
                          to="/login"
                        >
                          LogOut
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item pe-1">
                <Badge count={cart?.length} showZero>
                  <Link to="/cart" className="nav-link cart">
                    
                    <ShoppingCartOutlined />
                  
                  </Link>
                </Badge>
              </li>
            </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
