import React from "react";
import Layout from "../../component/layout/Layout";
import "./About.css";

const About = () => {
  return (
    <Layout title="About us - E-Commerce Shop">
      <div className="about-us-container">
        <h2 className="about-us-heading">Welcome to ABCL Ecommerce</h2>
        <p className="about-us-text">
          Your ultimate destination for all your online shopping needs. We are
          dedicated to providing a seamless and enjoyable shopping experience
          for our customers, offering a wide range of high-quality products from
          various categories.
        </p>
        <h3 className="vision-heading">Our Vision</h3>
        <p className="vision-text">
          At ABCL Ecommerce, our vision is to become a trusted and preferred
          online marketplace that caters to the diverse needs and preferences of
          our customers. We strive to offer an extensive selection of products,
          competitive prices, and excellent customer service to create a
          positive and satisfying shopping experience.
        </p>
        <h3 className="quality-heading">Quality Products</h3>
        <p className="quality-text">
          We understand the importance of quality when it comes to your
          purchases. That's why we partner with reputable brands and trusted
          suppliers to bring you products that meet the highest standards of
          quality and reliability. Whether you're looking for electronics,
          fashion, home essentials, or beauty products, we've got you covered.
        </p>
        <h3 className="service-heading">Exceptional Customer Service</h3>
        <p className="service-text">
          Our customers are at the heart of everything we do. We are committed
          to providing exceptional customer service to ensure your satisfaction
          at every step of your shopping journey. Our friendly and knowledgeable
          support team is always ready to assist you with any inquiries,
          concerns, or product recommendations.
        </p>
        <h3 className="security-heading">Secure and Convenient Shopping</h3>
        <p className="security-text">
          We prioritize the security and privacy of our customers. Our website
          is equipped with the latest security measures to protect your personal
          and financial information. With our user-friendly interface and
          convenient navigation, you can easily browse, compare, and purchase
          your desired products with just a few clicks.
        </p>
        <h3 className="delivery-heading">Fast and Reliable Delivery</h3>
        <p className="delivery-text">
          We understand that prompt delivery is crucial to your shopping
          experience. That's why we work closely with reliable logistics
          partners to ensure timely and hassle-free delivery of your orders. We
          strive to provide accurate tracking information so you can stay
          updated on the status of your package.
        </p>
      </div>
    </Layout>
  );
};

export default About;
