import React from "react";

const Home = () => {
  return (
    <div className="w-full h-full bg-[url(/images/image1.jpg)] bg-cover bg-center grid items-end pl-[80px]">
      <p className="text-[3vw] leading-[160%] text-white mb-[-180px]">
        "BINA" <br />
        An AI-based Platform to <br />
        Process, Analyze and Visualize <br />
        Environmental Data <br />
      </p>
      <a
        href="#"
        className="border-[2px] border-[#FFF] w-[151px] h-[100px] text-[1.8vw] text-white flex text-center items-center justify-self-center mb-[80px]"
      >
        Launch BINA
      </a>
    </div>
  );
};

export default Home;

{
  /* <div className="container bg-[url(/images/image1.jpg)] bg-cover bg-center w-full h-full mt-[10%] animate-[zoom-in-zoom-out] text-center leading-[50px] text-[15px] text-white">
  <div className="title w-full h-[50%] text-white text-[3vw] text-left leading-[160%] font-[700]">
    <h1>"BINA"</h1>
    <br />
    <p>
      {" "}
      An AI-based Platform to Process, Analyze and Visualize Environmental Data
    </p>
  </div>
  <div className="subtext absolute top-[125%] w-full h-[20%] text-white text-[2vw] text-left leading-[160%] opacity-0 animate-fade">
    <a id="href" href="map.html?image/image1.jpg">
      <i className="fas fa-map-marker-alt"></i>
      <p id="subtext absolute top-[125%] w-full h-[20%] text-white text-[2vw] text-left leading-[160%] opacity-0 animate-fade">
        Bemani, Hormozgan
      </p>
    </a>
  </div>
  <a href="map.html">
    <div className="map absolute left-[45%] top-[80%] w-[10%] h-[10%] text-white text-[1.8vw] leading-[100%] border border-[#ffffff] opacity-0 flex justify-center items-center animate-[map_fade]">
      <h2>Launch BINA</h2>
    </div>
  </a>
</div>; */
}
