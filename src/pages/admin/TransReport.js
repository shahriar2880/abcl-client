import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import AdminMenu from "../../component/adminMenu/AdminMenu";
import "./admin.css";

import { Chart } from "chart.js/auto";

import { BiMoney, BiUser } from "react-icons/bi";
import { BsFillCartCheckFill, BsFillBagCheckFill } from "react-icons/bs";
import Iframe from "react-iframe";
import axios from "axios";
import { useAuth } from "../../context/auth";

import { toast } from "react-hot-toast";
import { Bar } from "react-chartjs-2";
import { GiClick, GiMoneyStack } from "react-icons/gi";
import { OrderedListOutlined } from "@ant-design/icons";

const TransReport = (props) => {
  const [products, setProduct] = useState([]);
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  // Register the linear scale

  // const [totalQuantity, setTotalQuantity] = useState(0);

  // const [transactions, setTransactions] = useState([]);
  const totalOrders = orders.length;

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "https://abcl-server.vercel.app/api/v1/auth/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error while getting users");
    }
  };

  const handleMonthSelect = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearSelect = (event) => {
    setSelectedYear(event.target.value);
  };

  const getFilteredUsers = () => {
    if (!selectedMonth && !selectedYear) {
      return users;
    }

    const filteredUsers = users.filter((user) => {
      const userRegistrationDate = new Date(user.createdAt);
      const userRegistrationMonth = userRegistrationDate.getMonth() + 1; // Get the month (1-12)
      const userRegistrationYear = userRegistrationDate.getFullYear(); // Get the full year

      const monthMatch =
        !selectedMonth || userRegistrationMonth.toString() === selectedMonth;
      const yearMatch =
        !selectedYear || userRegistrationYear.toString() === selectedYear;

      return monthMatch && yearMatch;
    });

    return filteredUsers;
  };

  const totalUsersInMonth = getFilteredUsers().length;

  const getFilteredOrders = () => {
    if (!selectedMonth && !selectedYear) {
      return orders;
    }

    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      const orderMonth = orderDate.getMonth() + 1;
      const orderYear = orderDate.getFullYear();

      const monthMatch =
        !selectedMonth || orderMonth.toString() === selectedMonth;
      const yearMatch = !selectedYear || orderYear.toString() === selectedYear;

      return monthMatch && yearMatch;
    });

    return filteredOrders;
  };

  const filteredOrders = getFilteredOrders();

  // Prepare data for the chart
  const chartData = {
    labels: filteredOrders.map((order) => {
      const date = new Date(order.createdAt);
      const formattedDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      return formattedDate;
    }),
    datasets: [
      {
        label: "Total Amount",
        data: filteredOrders.map((order) => {
          const totalAmount = order.products.reduce(
            (sum, product) => sum + product.price,
            0
          );
          return totalAmount;
        }),
        backgroundColor: "blue",
      },
    ],
  };

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://abcl-server.vercel.app/api/v1/auth/all-orders"
      );
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
      const { data } = await axios.get(
        `https://abcl-server.vercel.app/api/v1/product/get-product`
      );
      console.log(products);
      setProduct(data.products);

      //   // Calculate total quantity
      // let total = 0;
      // data.products.forEach((product) => {
      //   total += product.quantity;
      // });
      //   setTotalQuantity(total);
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

  const calculateTotalQuantity = () => {
    let totalQuantity = 0;
    products.forEach((product) => {
      totalQuantity += product.quantity;
    });
    return totalQuantity;
  };

  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3 mb-2">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="col-md-12 col-lg-12 mb-3">
              <div className="row">
                <div className=" col-md-4 col-sm-12 mb-2">
                  <div className="card card-body mb-4 shadow-sm total-sales-card">
                    <div className="text-sales d-flex flex-column">
                      <span className="">
                        <GiMoneyStack></GiMoneyStack>
                      </span>
                      <h6 className="text-center">Total Sales:</h6>
                    </div>
                    <div>
                      {salesData.length > 0 ? (
                        <h1 className="text-center animated fadeIn">
                          {salesData.length > 0
                            ? salesData.reduce(
                                (total, data) => total + data.sales,
                                0
                              ).toFixed(2)
                            : 0}
                          $
                        </h1>
                      ) : (
                        <p>No sales data available.</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" col-md-4 col-sm-12 mb-2">
                  <div className="card card-body mb-4 shadow-sm total-sales-card">
                    <div className="text-sales">
                      <span className="">
                        <GiClick></GiClick>
                      </span>
                      <h6 className="text-center">Total Orders:</h6>
                    </div>
                    <div>
                      {orders.length > 0 ? (
                        <h1 className="text-center animated fadeIn">
                          {orders.length}
                        </h1>
                      ) : (
                        <p>No order data available.</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12 d-flex mb-2">
                  <div className="card card-body mb-4 shadow-sm total-users-card ">
                    <div className="d-flex flex-column gap-1">
                      <div>
                        <label htmlFor="monthSelect">Select Month:</label>
                        <select
                          id="monthSelect"
                          value={selectedMonth}
                          onChange={handleMonthSelect}
                        >
                          <option value="">All Months</option>
                          <option value="1">January</option>
                          <option value="2">February</option>
                          <option value="3">March</option>
                          <option value="4">April</option>
                          <option value="5">May</option>
                          <option value="6">June</option>
                          <option value="7">July</option>
                          <option value="8">August</option>
                          <option value="9">September</option>
                          <option value="10">October</option>
                          <option value="11">November</option>
                          <option value="12">December</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="yearSelect">Select Year:</label>
                        <select
                          id="yearSelect"
                          value={selectedYear}
                          onChange={handleYearSelect}
                        >
                          <option value="">All Years</option>
                          <option value="2021">2021</option>
                          <option value="2022">2022</option>
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                          <option value="2025">2025</option>
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                          <option value="2029">2029</option>
                          <option value="2030">2030</option>
                          <option value="2031">2031</option>
                          <option value="2032">2032</option>
                          <option value="2033">2033</option>
                          <option value="2034">2034</option>
                          {/* Add options for all years */}
                        </select>
                      </div>
                    </div>
                    <h1>
                      <BiUser /> {totalUsersInMonth} user
                    </h1>
                    <table>{/* Render table rows for filteredUsers */}</table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-sm-12 d-flex">
              <div className="card card-body mb-4 shadow-sm">
                <Bar
                  data={chartData}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: false,
                      },
                    },
                  }}
                />
                <h6 className="text-center">Sales Chart</h6>
              </div>
            </div>
            {/* <div className=" col-md-4 col-sm-4">
              <div className="card card-body mb-4 shadow-sm">
              <div className="text">
                  <span className="">
                    <BiMoney></BiMoney>
                  </span>
                  <h6 className="mb-1">Total Products: {totalQuantity}</h6>
                </div>
              </div>
            </div> */}
            <div className="col-md-12 col-sm-12">
              <div className="card card-body mb-4 shadow-sm">
                <h1>Total Quantity of Products</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex  justify-content-between">
                <p>Total Quantity:</p>
                <p>{calculateTotalQuantity()}</p>
                </div>
              </div>
            </div>
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
              <div className="card card-body mb-4 shadow-sm">
                <div className="text">
                  <span className="">
                    <BiMoney></BiMoney>
                  </span>
                  <h6 className="mb-1">Sales on Month</h6>
                </div>
                <div>
                  <Iframe
                    url="https://charts.mongodb.com/charts-project-0-dxvnt/embed/charts?id=648b97a3-4651-4624-85be-d66c520d8a56&maxDataAge=3600&theme=light&autoRefresh=true"
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
            {/* <div className=" col-md-12 col-sm-12">
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
            </div> */}
            {/* <div className=" col-md-12 col-sm-12">
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
            </div> */}
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TransReport;
