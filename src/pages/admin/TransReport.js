import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import AdminMenu from "../../component/adminMenu/AdminMenu";

import { BiMoney } from "react-icons/bi";
import { BsFillCartCheckFill, BsFillBagCheckFill } from "react-icons/bs";
import Iframe from "react-iframe";
import axios from "axios";
import { useAuth } from "../../context/auth";
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Tooltip } from "antd";
import { Line } from "react-chartjs-2";
import { Legend } from "chart.js";
import { toast } from "react-hot-toast";

const TransReport = (props) => {
  const [products, setProduct] = useState([]);
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [salesData, setSalesData] = useState([]);
  // const [transactions, setTransactions] = useState([]);
  const totalOrders = orders.length;

  const getOrders = async () => {
    try {
      const { data } = await axios.get("https://abcl-server.vercel.app/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  //get all product
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`https://abcl-server.vercel.app/api/v1/product/get-product`);
      console.log(products);
      setProduct(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  //   useEffect(() => {
  //     const salesChartData = orders.map((order, index) => ({
  //       createdAt: order.createdAt,
  //       sales: order.products.reduce((sum, product) => sum + product.price, 0),
  //     }));
  //     setSalesData(salesChartData);
  //   }, [orders]);
  useEffect(() => {
    const calculateSalesData = () => {
      const calculatedSalesData = orders.map((order) => ({
        createdAt: order.createdAt,
        sales: order.products.reduce((sum, product) => sum + product.price, 0),
      }));
      return calculatedSalesData;
    };

    const salesData = calculateSalesData();
    setSalesData(salesData);
  }, [orders]);

  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Report</h1>
            <div className="d-flex   flex-md-column flex-sm-column fl gap-2">
              <div className=" col-md-12 col-sm-12">
                <div className="card card-body mb-4 shadow-sm">
                  <div className="text">
                    <span className="">
                      <BiMoney></BiMoney>
                    </span>
                    <h6 className="mb-1">Sales on Date</h6>
                  </div>
                  <div>
                    <Iframe
                      url="https://charts.mongodb.com/charts-project-0-dxvnt/embed/charts?id=647e4315-f3f7-43af-8709-05feaee81f63&maxDataAge=3600&theme=light&autoRefresh=true"
                      styles={{
                        background: "#ffff",
                        border: "none",
                        borderRadius: "2px",
                        boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                        width: "100%",
                        height: "480px",
                      }}
                    ></Iframe>
                  </div>
                </div>
              </div>
              <div className=" col-md-12 col-sm-12">
                <div className="card card-body mb-4 shadow-sm">
                  <div className="text">
                    <span className="">
                      <BsFillCartCheckFill></BsFillCartCheckFill>
                    </span>
                    <h6 className="mb-1">Total Orders: {totalOrders}</h6>
                  </div>
                  <div>
                    <Iframe
                      url="https://charts.mongodb.com/charts-project-0-dxvnt/embed/charts?id=647f1403-abe9-4a0c-8a71-1e7088bb3fbd&maxDataAge=60&theme=light&autoRefresh=true"
                      styles={{
                        background: "#ffff",
                        border: "none",
                        borderRadius: "2px",
                        boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                        width: "100%",
                        height: "480px",
                      }}
                    ></Iframe>
                  </div>
                </div>
              </div>
              <div className=" col-md-12 col-sm-12">
                <div className="d-flex flex-column card card-body mb-4 shadow-sm">
                  <div className="text">
                    <span className="">
                      <BsFillBagCheckFill></BsFillBagCheckFill>
                    </span>
                    <h6>Total Products:</h6>
                  </div>
                  <div>
                    <Iframe
                      url="https://charts.mongodb.com/charts-project-0-dxvnt/embed/charts?id=647e466c-23c6-4d94-8047-74915d7c80c2&maxDataAge=60&theme=light&autoRefresh=true"
                      styles={{
                        background: "#ffff",
                        border: "none",
                        borderRadius: "2px",
                        boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                        width: "99%",
                        height: "480px",
                      }}
                    ></Iframe>
                  </div>
                </div>
              </div>
              <div className=" col-md-12 col-sm-12">
                <div className="d-flex flex-column card card-body mb-4 shadow-sm">
                  <div className="text">
                    <span className="">
                      <BsFillBagCheckFill></BsFillBagCheckFill>
                    </span>
                    <h6>Order Status:</h6>
                  </div>
                  <div>
                    <Iframe
                      url="https://charts.mongodb.com/charts-project-0-dxvnt/embed/charts?id=648468f4-a250-489e-829a-faf068f3f070&maxDataAge=3600&theme=light&autoRefresh=true"
                      styles={{
                        background: "#ffff",
                        border: "none",
                        borderRadius: "2px",
                        boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                        width: "99%",
                        height: "480px",
                      }}
                    ></Iframe>
                  </div>
                </div>
              </div>
              <div className=" col-md-12 col-sm-12">
                <div
                  className="d-flex flex-column card card-body mb-4 shadow-sm"
                  style={{ width: "100%", height: "50%" }}
                >
                  <div className="text">
                    <span className="">
                      <BsFillBagCheckFill></BsFillBagCheckFill>
                    </span>
                    <h6>Total Sales:</h6>
                  </div>

                  <div>
                    {salesData.length > 0 ? (
                      <h1 className="text-center">
                        {salesData.length > 0
                          ? salesData.reduce(
                              (total, data) => total + data.sales,
                              0
                            )
                          : 0}
                        $
                      </h1>
                    ) : (
                      <p>No sales data available.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TransReport;
