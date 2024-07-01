import React from "react";

const Contact = () => {
  return (
    <div>
      <img
        src="/images/shadegan_header.png"
        className="w-full block mb-[40px]"
      />

      <div className="w-[75%] mx-auto mb-[70px]">
        <h3 className="text-[35px] font-bold">Contact Us</h3>

        <p className="text-[25px] font-normal text-justify leading-[40px] mb-[40px]">
          Mailing address: 425 Civil Engineering Department, Sharif University
          of Technology, Azadi Ave., Tehran, Tehran, Iran <br />
          Email: danesh@sharif.edu <br />
          Tell: +98 (21) 66164241 <br />
        </p>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.9990550161046!2d51.34838808776515!3d35.70164086692187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00a6421aaaab%3A0x58579384133c80f5!2sDepartment%20of%20Civil%20Engineering!5e0!3m2!1sen!2s!4v1649746061292!5m2!1sen!2s"
          width="600"
          height="450"
          style={{ border: 0, margin: "0 auto" }}
          allowFullScreen={false}
          loading="lazy"
        ></iframe>
      </div>

      <img src="/images/shadegan_footer.png" className="w-full opacity-50" />
    </div>
  );
};

export default Contact;
