import React from 'react'
import Layout from './../../component/layout/Layout';
import { useSearch } from '../../context/search';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate()
    const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <Row className="d-flex flex-wrap">
            {values.results.map((p) => (
              <Col md={3} key={p._id}>
                <div className="card m-2">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body style={{ minWidth: '15rem', minHeight:'25rem'}}">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.slice(0, 40)}...{" "}
                      
                    </p>
                    <p className="card-text">{p.price}$</p>
                    <div className="d-flex flex-column mt-2 gap-2  w-100">
                      <button className="btn btn-secondary" onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button>
                      <button className="btn btn-secondary">Add To Cart</button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Layout>
  )
}

export default Search
