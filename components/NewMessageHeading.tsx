interface props {
   title: string;
   desc: string;
}

const NewMessageHeading = ({ title, desc }: props) => {
   return (
      <>
         <h1 className="text-[2.22vw] font-[500] leading-[2.78vw] text-[#344767] mb-[0.69vh]">
            {title}
         </h1>
         <p className="text-[0.97vw] font-[400] leading-[1.39vw] text-[#7B809A] mb-[1.86vh]">
            {desc}
         </p>
      </>
   );
};

export default NewMessageHeading;
