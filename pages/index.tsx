import React from "react";

const Home = () => {
  return (
    <div>
      <div className="image">
        <img id="map" src="image/image1.jpg" />
      </div>
      <div className="container">
        <div className="text">
          <div className="title">
            <h1>"BINA"</h1>
            <br />
            <p>
              {" "}
              An AI-based Platform to Process, Analyze and Visualize
              Environmental Data
            </p>
          </div>
          <div className="subtext">
            <a id="href" href="map.html?image/image1.jpg">
              <i className="fas fa-map-marker-alt"></i>
              <p id="subtext">Bemani, Hormozgan</p>
            </a>
          </div>
        </div>
        <a href="map.html">
          <div className="map">
            <h2>Launch BINA</h2>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
