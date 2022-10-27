import React from "react";
import Directory from "../../components/Directory";
import './styles.scss'
import Footer from "../../components/Footer";

const Homepage = props => {
  return (
    <section className="homepage">
      <Directory />
      <Footer />
    </section>
  );
};

export default Homepage;