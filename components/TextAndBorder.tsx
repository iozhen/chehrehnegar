import React from "react";

interface props {
   text: string;
   className: string;
}

const TextAndBorder = ({ text, className }: props) => {
   return (
      <div
         className={
            "flex items-center mt-[3.125vh] w-full gap-[11px] " + className
         }
      >
         <h3 className="text-[#9F9F9F] text-[1.46vh] font-[300]">{text}</h3>
         <div className="h-[1px] w-[100%] bg-[#9F9F9F]"></div>
      </div>
   );
};

export default TextAndBorder;
