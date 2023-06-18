import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";
import { toast } from "react-hot-toast";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { BiCart } from "react-icons/bi";

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProduct] = useState([]);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //   const handleLogin = () => {
  //     navigate("/login");
  //     };

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updatedProducts = async (productId) => {
    try {
      // Send a request to update the product quantity
      await axios.post(`/api/product/update-product-quantity/${productId}`); // Replace with your API endpoint

      // Update the product quantity in the component state
      setProduct((prevProduct) => ({
        ...prevProduct,
        stock: prevProduct.stock - 1,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  // Delete item from the cart and increase product quantity

  //Delete item from the cart and increase product quantity
  //   const removeCartItem = (productId) => {
  //     try {
  //       const updatedCart = cart.filter((item) => item._id !== productId);
  //       setCart(updatedCart);
  //       localStorage.setItem("cart", JSON.stringify(updatedCart));

  //       // Increase the product quantity in the database
  //       updateProductQuantity(productId, 1);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const increaseQuantity = (productId, quantity) => {
    try {
      const updatedCart = cart.map((p) => {
        if (p._id === productId) {
          // Increase the quantity of the matching order item
          return { ...p, quantity: p.quantity + quantity };
        }
        return p;
      });

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      updatedProducts(pid);
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("https://abcl-server.vercel.app/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("https://abcl-server.vercel.app/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      for (const p of cart) {
        await updatedProducts(p._id);
      }
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-info p-2 mb-1">
              {`Hello '${auth?.token && auth?.user?.name}'`}
            </h1>
            <h4 className="text-center justify-content-center d-flex flex-column">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
              <Link to="/">
                Please add something into <BiCart />
              </Link>
            </h4>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-7">
              {cart?.map((p) => (
                <div
                  className="row mb-2 p-3 card flex-row"
                  style={{ backgroundColor: "white" }}
                >
                  <div className="col-md-6 col-sm-4">
                    <img
                      src={`https://abcl-server.vercel.app/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                  </div>
                  <div className="col-md-6 col-sm-8">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price : {p.price}</p>
                    
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        removeCartItem(p._id);
                        toast.success("Item removed from cart");
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-lg-4 col-md-4 col-sm-5 text-center">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address:</h4>
                    <h6>{auth?.user?.address}</h6>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                    <h1>Make a Payment</h1>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2 mb-5">
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
