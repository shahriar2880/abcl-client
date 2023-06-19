import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import "./Home.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Row, Col } from "react-bootstrap";
import { Checkbox, Radio } from "antd";
import { Prices } from "../../component/price/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import {
  CarOutlined,
  ContactsOutlined,
  DeliveredProcedureOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { GiCash, GiCutDiamond, GiStorkDelivery } from "react-icons/gi";
import { BiDiamond } from "react-icons/bi";

const Home = ({ id }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "https://abcl-server.vercel.app/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://abcl-server.vercel.app/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProduct([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://abcl-server.vercel.app/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get product
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://abcl-server.vercel.app/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProduct(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  // filter by category//
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filtered product

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "https://abcl-server.vercel.app/api/v1/product/filters-product",
        {
          checked,
          radio,
        }
      );
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="All Product - Best Offers">
      <div className="container-fluid row mt-3">
        <div className="col-md-3 home-1">
          <h5 className="text-center">Filter By Category</h5>
          <div className="d-flex flex-column ">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* filter price */}
          <h5 className="text-center mt-4">Filter By Price</h5>
          <div className="d-flex flex-column ">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column ">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
          {/* <h5 className="mt-4">
            <GiCutDiamond /> BEST SELLING PRODUCTS
          </h5>
          {products?.slice(0, 5).map((p) => (
            <div
              key={p._id}
              style={{
                display: "flex",
                alignItems: "center",
                backgroundImage: "linear-gradient(to right, yellowgreen, skyblue)",
                borderRadius: "3px",
                marginBottom:"3px",
                paddingLeft:"2px",
                paddingBottom: "3px",
              }}
            >
              <img
                src={`https://abcl-server.vercel.app/api/v1/product/product-photo/${p._id}`}
                alt=""
                style={{ width: "40px", height: "40px", marginRight: "10px" }}
              />
              <div>
                <h6>{p.name}</h6>
                <p style={{ fontWeight: "bold" }}>Price: {p.price}$</p>
              </div>
            </div>
          ))} */}
        </div>
        <div className="col-md-9 home-2">
          {/* {JSON.stringify(radio, null, 4)} */}
          {/* <h1 className="text-center">All Product</h1> */}
          <div className="d-flex flex-column">
            <Row className="flex-wrap">
              <div
                id="carouselExampleControlsNoTouching"
                class="carousel slide"
                data-bs-touch="false"
                data-bs-interval="false"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="/images/carousel-1.png"
                      className="d-block"
                      style={{ height: "200px", width: "100%" }}
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="/images/carousel-2.png"
                      className="d-block"
                      style={{ height: "200px", width: "100%" }}
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="/images/carousel-3.png"
                      className="d-block"
                      style={{ height: "200px", width: "100%" }}
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev custom-carousel-control"
                  type="button"
                  data-bs-target="#carouselExampleControlsNoTouching"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next custom-carousel-control"
                  type="button"
                  data-bs-target="#carouselExampleControlsNoTouching"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>

              {products?.map((p) => (
                <Col md={4} key={p._id} className="my-3">
                  <div className="card m-2 mb-3 d-flex flex-column h-100">
                    <img
                      src={`https://abcl-server.vercel.app/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text flex-grow-1">
                        {p.description && p.description.slice(0, 40) + "..."}
                      </p>

                      {/* <p className="card-text">
                        {p.quantity > 0 ? (
                          <span className="text-success">In Stock</span>
                        ) : (
                          <span className="text-danger">Out of Stock</span>
                        )}
                      </p> */}
                      <p className="card-text">Price: {p.price}$</p>
                      <div className="mt-auto">
                        <button
                          className="btn btn-secondary w-100"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-secondary mt-2 w-100"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item Added to cart");
                          }}
                        >
                          Add To Cart
                        </button>
                        
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            <div className="m-2 p-3 text-center">
              {products && products.length < total && (
                <button
                  className="btn btn-warning "
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ..." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between bg-primary w-100 p-3">
        <div className="d-flex align-items-center justify-content-between gap-2 ms-5">
          <h1>
            <CarOutlined />
          </h1>
          <div>
            <h4>FREE DELIVERY</h4>
            <p>From Buy Item 60$</p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between gap-2">
          <h1>
            <GiCash />
          </h1>
          <div>
            <h4>CASH ON DELIVERY</h4>
            <p>All Over Bangladesh</p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between gap-2">
          <h1>
            <GiftOutlined />
          </h1>
          <div>
            <h4>FREE GIFT BOX</h4>
            <p>& Gift Note</p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between gap-2 me-5">
          <h1>
            <ContactsOutlined />
          </h1>
          <div>
            <h4>CONTACT WITH US</h4>
            <p>01608456891</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
