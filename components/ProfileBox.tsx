interface props {
   text: string;
}

const ProfileBox = ({ text }: props) => {
   return (
      <div className="w-[38px] h-[38px] bg-[#4FAFCB] rounded-[4px] text-white flex justify-center items-center text-[17px] font-[700]">
         {text}
      </div>
   );
};

export default ProfileBox;
