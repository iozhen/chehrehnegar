import React from "react";

const Header = () => {
  return (
    <div className="header_nofade">
      <a href="https://en.sharif.edu/" target="_blank">
        {/* comment */}
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
  );
};

export default Header;
