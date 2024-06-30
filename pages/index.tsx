import React from "react";

const Home = () => {
  return (
    <div>
      <div className="image">
        <img id="map" src="image/image1.jpg" />
      </div>
      <div className="container">
        <div className="header"></div>
        <div className="header_nofade">
          <a href="https://en.sharif.edu/" target="_blank">
            <div className="sharif">
              <img src="/images/sharif.png" />
            </div>
          </a>
          <div className="falan">
            <a href="homefa.html">
              <p>فا</p>
            </a>
          </div>
          <div className="contact">
            <a href="contact.html">
              <p>Contact Us</p>
            </a>
            <div className="team">
              <a href="team.html">
                <p>Team</p>
              </a>
              <div className="about">
                <a href="about.html">
                  <p>About</p>
                </a>
                <div className="home">
                  <a href="index.html">
                    <p>Home</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
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
