import React from 'react';
import Layout from '../../component/layout/Layout';
import { BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi';
import './Contact.css';

const Contact = () => {
  return (
    <Layout title="Contact us - E-Commerce Shop">
      <div className="contact-container">
        {/* <div className="contact-image">
          <img
            src="/images/contact-us.jpeg"
            alt="contact-us"
            className="image"
          />
        </div> */}
        <div className="contact-details">
          <h1 className="contact-heading">CONTACT US</h1>
          <p className="contact-text">
            Have any questions or need more information about our products? Feel
            free to reach out to us anytime. Our dedicated support team is
            available 24/7 to assist you.
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <BiMailSend className="contact-icon" />
              <p className="contact-info-text">Email: help@ecommerceapp.com</p>
            </div>
            <div className="contact-item">
              <BiPhoneCall className="contact-icon" />
              <p className="contact-info-text">Phone: 017-50827850</p>
            </div>
            <div className="contact-item">
              <BiSupport className="contact-icon" />
              <p className="contact-info-text">Toll-Free: 1800-0000-0000</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
