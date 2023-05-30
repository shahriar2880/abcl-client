import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';


const Layout = ({ children, title, description, keyword, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
        <title>{ title}</title>
        
      </Helmet>
      <Header />
      <main style={{ minHeight: "76vh" }}>
        <Toaster/>
        {children}
      </main>
        <Footer />
    </div>
  );
};

export default Layout;
