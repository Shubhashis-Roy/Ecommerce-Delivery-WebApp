import React from "react";
import Footer from "./Footer";
import Header from "./Header";
// import { Helmet } from 'react-helmet'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <ToastContainer />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
