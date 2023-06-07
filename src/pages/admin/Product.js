import React, { useEffect, useState } from "react";
import AdminMenu from "../../component/adminMenu/AdminMenu";
import Layout from "../../component/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

const Product = () => {
  const [products, setProduct] = useState([]);

  //get all product
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProduct(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
    
  return (
    <Layout title={"Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Products</h1>

            <div className="d-flex">
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
                      
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
               */}
              <Row className="d-flex flex-wrap">
                {products?.map((p) => (
                
                <Col md={3} key={p._id} className="my-3" style={{ width: "18rem" }}>
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
            </div>
            {/* {renderProductRows()} */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
