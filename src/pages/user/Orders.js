import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import UserMenu from "../../component/userMenu/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment/moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  // Function to refresh moment time every minute
  const refreshMomentTime = () => {
    const updatedOrders = [...orders];
    updatedOrders.forEach((o) => {
      o.timeFromNow = moment(o?.createAt).fromNow();
    });
    setOrders(updatedOrders);
  };

  useEffect(() => {
    // Refresh moment time every minute
    const interval = setInterval(refreshMomentTime, 60000);

    return () => {
      // Clean up the interval on component unmount
      clearInterval(interval);
    };
  }, [orders]);

  const getUpdatedTime = (order) => {
    // Assuming your order object has an 'updatedAt' field
    return moment(order?.updatedAt).format("YYYY-MM-DD HH:mm:ss");
  };
  return (
    <Layout title={"Dashboard - Orders"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border border-2 rounded shadow mb-3"  key={o._id}>
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
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        {/* <td>{moment(o?.createAt).fromNow()}</td> */}
                        <td>{getUpdatedTime(o)}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
