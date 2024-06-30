import data from "../data/db.json";

interface aboutListType {
  title: string;
}

const About = () => {
  return (
    <div>
      <img
        src="/images/shadegan_header.png"
        className="w-full block mb-[40px]"
      />

      <div className="w-[75%] mx-auto mb-[70px]">
        <h3 className="text-[35px] font-bold">About</h3>

        <p className="text-[25px] font-normal text-justify leading-[40px] mb-[30px]">
          BINA is an AI-based WebGIS platform for environmental monitoring
          purposes. BINA uses the state-of-the-art AI-based techniques to
          process Sentinel/Landsat images and extract quantitative and
          qualitative information on water and other environmental resources.
          The optimized architecture of BINA allows efficient processing,
          storage, display, and navigation of geospatial Earth data, with the
          aid of Earth Engine. BINA currently monitors the history of surface
          area and eutrophication status in 55 reservoirs across Iran. Modules
          on wetland monitoring, agricultural water consumption, early flood
          forecasting and awareness, and aerosol dynamics will apprear soon.
          BINA has been developed by the computational hydrology and remote
          sensing research group at Sharif University of Technology, with the
          support of the Office of Vice President for Research and Technology.
        </p>

        <h3 className="text-[35px] font-bold pb-[30px]">
          Some example applications
        </h3>

        <ul className="pl-[45px]">
          {data.aboutUsList.map(({ title }: aboutListType, index: number) => (
            <li key={index} className="list-disc text-[25px] font-normal">
              {title}
            </li>
          ))}
        </ul>
      </div>

      <img src="/images/shadegan_footer.png" className="w-full opacity-50" />
    </div>
  );
};

export default About;
