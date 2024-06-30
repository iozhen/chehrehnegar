import React from "react";

const About = () => {
  return (
    <div>
      <div>hero</div>
      <h2>About</h2>
      <p>
        BINA is an AI-based WebGIS platform for environmental monitoring
        purposes. BINA uses the state-of-the-art AI-based techniques to process
        Sentinel/Landsat images and extract quantitative and qualitative
        information on water and other environmental resources. The optimized
        architecture of BINA allows efficient processing, storage, display, and
        navigation of geospatial Earth data, with the aid of Earth Engine. BINA
        currently monitors the history of surface area and eutrophication status
        in 55 reservoirs across Iran. Modules on wetland monitoring,
        agricultural water consumption, early flood forecasting and awareness,
        and aerosol dynamics will apprear soon. BINA has been developed by the
        computational hydrology and remote sensing research group at Sharif
        University of Technology, with the support of the Office of Vice
        President for Research and Technology.
      </p>
      <h2>Some example applications</h2>
      <ul>
        <li>Monitoring the area of dams and wetlands</li>
        <li>Monitoring the eutrophication level in dams and wetlands</li>
        <li>Monitoring the intensity and spatial extent of aerosol</li>
        <li>Flood forecast and early warning</li>
        <li>Monitoring agricultural water consumption</li>
      </ul>
    </div>
  );
};

export default About;
