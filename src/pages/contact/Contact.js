import React from 'react'
import Layout from '../../component/layout/Layout'
import "./Contact.css"
import {BiMailSend,BiPhoneCall,BiSupport} from "react-icons/bi"

const Contact = () => {
  return (
    <Layout title="Contact us - E-Commerce Shop">
      <div className="row contact-us ">
        <div className="col-md-6 ">
          <img
            src="/images/contact-us.jpeg"
            alt="contact-us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about product feel free to call anytime we 24X7
            variable
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
