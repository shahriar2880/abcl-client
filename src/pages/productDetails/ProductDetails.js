import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Product details"}>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height={"350px"}
            width={"250px"}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}$</h6>
          <h6>Category : {product?.category?.name}</h6>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <div className="row container">
        <h4>Similar Products</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found!!</p>
              )}
              {/* 
              <Row className="d-flex flex-wrap">
              {products?.map((p) => (
                <Col md={3} key={p._id} className="my-3" style={{ width: "18rem" }}>
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
                        <button className="btn btn-secondary mt-2 w-100">
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
               */}
        <Row className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <Col md={3} key={p._id} className="my-3" style={{ width: "18rem" }}>
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
                    {/* onClick={()=> navigate(`/product/${p.slug}`)} */}
                  </p>
                  <p className="card-text">{p.price}$</p>
                  <div className="d-flex flex-column mt-2 gap-2  w-100">
                    <button className="btn btn-secondary">Add To Cart</button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default ProductDetails;
