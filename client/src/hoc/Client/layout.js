import React from "react";
import Header from "../../components/ClientComponents/Header_footer/Header/Header";
import Footer from "../../components/ClientComponents/Header_footer/Footer/Footer";

const Layout = (props) => {
  return (
    <>
      <Header />
      <div className="page_container">{props.children}</div>
      <Footer />
    </>
  );
};
export default Layout;
