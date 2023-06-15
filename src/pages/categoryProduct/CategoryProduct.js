import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useCart } from "../../context/cart";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `https://abcl-server.vercel.app/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Category-Product"}>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-md-12 offset-1">
          <Row className="d-flex flex-wrap">
              {products?.map((p) => (
                <Col md={3} key={p._id} className="my-3" style={{ width: "18rem" }}>
                  <div className="card m-2 mb-3 d-flex flex-column h-100">
                    <img
                      src={`https://abcl-server.vercel.app/api/v1/product/product-photo/${p._id}`}
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
                        <button className="btn btn-secondary mt-2 w-100"
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
