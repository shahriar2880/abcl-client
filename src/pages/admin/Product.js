import React, { useEffect, useState } from "react";
import AdminMenu from "../../component/adminMenu/AdminMenu";
import Layout from "../../component/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

const Product = () => {
  const [products, setProduct] = useState([]);
  const [total, setTotal] = useState(0);
  // const [loading, setLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  //get all product
  // const getAllProducts = async () => {
  //   try {
  //     const { data } = await axios.get("/api/v1/product/get-product");
  //     setProduct(data.products);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong");
  //   }
  // };
  //get all product
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

  useEffect(() => {
    getAllProducts();
    getTotal();
  }, []);

  // //load more
  // const loadMore = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
  //     setLoading(false);
  //     setProduct([...products, ...data?.products]);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

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

  return (
    <Layout title={"Products"}>
      <div className="container-fluid row mt-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 home-2">
            <div className="d-flex flex-column">
              <Row className=" flex-wrap">
                {products?.map((p) => (
                  <Col md={4} key={p._id} className="my-3">
                    <Link
                      key={p._id}
                      to={`/dashboard/admin/product/${p.slug}`}
                      className="product-link"
                    >
                      <div
                        className="card m-2 mb-3 d-flex flex-column h-100"
                        key={p._id}
                      >
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                        />
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text flex-grow-1">
                            {p.description.slice(0, 100)}

                            {/* {button} */}
                          </p>
                        </div>
                      </div>
                    </Link>
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
            {/* {renderProductRows()} */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
