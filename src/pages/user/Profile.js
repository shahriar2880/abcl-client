import React from 'react'
import "./Dashboard.css"
import Layout from '../../component/layout/Layout'
import UserMenu from '../../component/userMenu/UserMenu'

const Profile = () => {
  return (
    <Layout title={"Dashboard - My Profile"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3 user-menu">
            <UserMenu/>
          </div>
          <div className="col-md-9">
            <div className='card w-75 p-3'>
              <h1>My Profile</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
