import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import AdminMenu from "../../component/adminMenu/AdminMenu";
import moment from "moment";
import { useAuth } from "../../context/auth.js";
import axios from "axios";
import { Select } from "antd";
import { Option } from "antd/es/mentions";

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "delivered",
    "cancel",
  ]);
  //   const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("https://abcl-server.vercel.app/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`https://abcl-server.vercel.app/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const getUpdatedTime = (order) => {
    // Assuming your order object has an 'updatedAt' field
    return moment(order?.updatedAt).format("YYYY-MM-DD HH:mm:ss");
  };
  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Order</h1>
            {orders?.map((o, i) => {
              return (
                <div
                  className="border border-2 rounded shadow mb-3"
                  key={o._id}
                >
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date & Time</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        {/* <td>{moment(o?.createAt).fromNow()}</td> */}
                        <td>{getUpdatedTime(o)}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  {/* <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2  card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`https://abcl-server.vercel.app/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height="100px"
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
