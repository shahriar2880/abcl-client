import React from 'react'
import Layout from '../../component/layout/Layout'
import AdminMenu from '../../component/adminMenu/AdminMenu'

const Users = () => {
  return (
    <Layout title={"All User"}>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu/>
        </div>
        <div className="col-md-9 mt-5">
          <h1>All users</h1>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default Users