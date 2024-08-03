import { Dispatch, SetStateAction } from "react";

interface props {
   title: string;
   setIsMessage?: Dispatch<SetStateAction<boolean>>;
   customType?: "submit";
}

const PrimaryButtonMessage = ({ title, setIsMessage, customType }: props) => {
   return (
      <button
         onClick={() => setIsMessage && setIsMessage(true)}
         className="font-[700] text-[14px] leading-[20px] text-white bg-[#4379EE] rounded-[10px] w-[236px] h-[40px]"
         type={customType ? customType : "button"}
      >
         {title}
      </button>
   );
};

export default PrimaryButtonMessage;
