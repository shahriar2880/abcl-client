import React from "react";
import Layout from "../../component/layout/Layout";
import useCategory from "../../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title="All Categories">
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-4 mb-4" key={c._id}>
              <div className="category-card">
                <div className="category-content">
                  <h3 className="category-title">{c.name}</h3>
                  <Link to={`/category/${c.slug}`} className="btn btn-primary">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
