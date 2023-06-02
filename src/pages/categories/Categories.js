import React from 'react'
import Layout from '../../component/layout/Layout'
import useCategory from '../../hooks/useCategory';
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row d-flex flex-column">
          {categories.map((c) => (
            <div className="mt-1 gx-3 gy-3" key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn btn-primary">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Categories
