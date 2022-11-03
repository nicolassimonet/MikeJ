import React from "react";
import Footer from "../components/Footer";
import Header from "../components/header";

const HomepageLayout = (props) => {
  return (
    <div className="full__height">
      <Header {...props} />
      {props.children}
      <Footer />
    </div>
  );
};

export default HomepageLayout;
