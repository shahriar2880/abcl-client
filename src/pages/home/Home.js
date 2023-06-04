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

const Home = () => {
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
      const { data } = await axios.get("/api/v1/product/product-count");
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
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
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
      const { data } = await axios.get("/api/v1/category/get-category");
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
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
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
      const { data } = await axios.post("/api/v1/product/filters-product", {
        checked,
        radio,
      });
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="All Product - Best Offers">
      <div className="container-fluid row mt-3">
        <div className="col-md-3">
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
        </div>
        <div className="col-md-9">
          {/* {JSON.stringify(radio, null, 4)} */}
          <h1 className="text-center">All Product</h1>
          <Row className="d-flex flex-wrap">
            {products?.map((p) => (
              <Col
                md={3}
                key={p._id}
                className="my-3"
                style={{ width: "18rem" }}
              >
                <div className="card m-2 mb-3 d-flex flex-column h-100">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text flex-grow-1">
                      {p.description.slice(0, 40)}...
                    </p>
                    <p className="card-text">{p.price}$</p>
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
    </Layout>
  );
};

export default Home;
