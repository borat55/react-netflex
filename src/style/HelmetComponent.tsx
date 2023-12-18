import React, { Component } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

class HelmetComponent extends Component {
  render() {
    return (
      <HelmetProvider>
        <Helmet>
          <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap" />
        </Helmet>
      </HelmetProvider>
    );
  }
}

export default HelmetComponent;
