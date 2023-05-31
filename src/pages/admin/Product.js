import React, { useState } from "react";
import AdminMenu from "../../component/adminMenu/AdminMenu";
import Layout from "../../component/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

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
  useState(() => {
    getAllProducts();
  }, []);
    
//   const button = (
//     <button onClick={() => {
//       alert("Are to sure?");
//     }}>See more</button>
//   );

  //   const renderProductRows = () => {
  //     const rows = [];
  //     for (let i = 0; i < products.length; i += 3) {
  //       const rowProducts = products.slice(i, i + 3);
  //       rows.push(
  //         <div className="d-flex flex-wrap product-container" key={i}>
  //           {rowProducts.map((product) => (
  //             <Link
  //               key={product._id}
  //               to={`/dashboard/admin/product/${product.slug}`}
  //               className="product-link"
  //             >
  //               <div className="card m-2" style={{ width: "18rem" }}>
  //                 <img
  //                   src={`/api/v1/product/product-photo/${product._id}`}
  //                   className="card-img-top"
  //                   alt={product.name}
  //                 />
  //                 <div className="card-body">
  //                   <h5 className="card-title">{product.name}</h5>
  //                   <p className="card-text">{product.description}</p>
  //                 </div>
  //               </div>
  //             </Link>
  //           ))}
  //         </div>
  //       );
  //     }
  //     return rows;
  //   };

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
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div
                    className="card m-2 "
                    style={{ width: "18rem" }}
                    key={p._id}
                  >
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description.slice(0,100)}
                        {/* {button} */}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {/* {renderProductRows()} */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
