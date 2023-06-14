import React from "react";
import Layout from "../../component/layout/Layout";
import "./Policy.css";

const Policy = () => {
  return (
    <Layout title="Our policy - E-Commerce Shop">
      <div className="privacy-policy-container">
        <h1 className="privacy-policy-heading text-center">Privacy Policy of ABCL IT</h1>
        <div className="privacy-policy-content">
          <h2 className="policy-section-heading">
            Information Collection and Use
          </h2>
          <p className="policy-section-description">
            This privacy policy has been compiled to better serve those who are
            concerned with how their ‘Personally identifiable information’ (PII)
            is being used online. PII, as used in US privacy law and information
            security, is information that can be used on its own or with other
            information to identify, contact, or locate a single person, or to
            identify an individual in context. Please read our privacy policy
            carefully to get a clear understanding of how we collect, use,
            protect or otherwise handle your Personally Identifiable Information
            in accordance with our website.
          </p>
          <h2 className="policy-section-heading">
            What personal information do we collect from the people that visit
            our website ?
          </h2>
          <p className="policy-section-description">
            When ordering or registering on our site, as appropriate, you may be
            asked to enter your name, email address, mailing address, phone
            number or other details to help you with your experience.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
