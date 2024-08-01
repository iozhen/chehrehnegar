interface props {
   title: string;
}

const PrimaryButtonMessage = ({ title }: props) => {
   return (
      <button className="font-[700] text-[14px] leading-[20px] text-white bg-[#4379EE] rounded-[10px] w-[236px] h-[40px]">
         {title}
      </button>
   );
};

export default PrimaryButtonMessage;
