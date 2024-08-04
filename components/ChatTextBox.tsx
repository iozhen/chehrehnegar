interface props {
   text: string;
   style: string;
}

const ChatTextBox = ({ text, style }: props) => {
   return (
      <div
         // prettier-ignore
         className={`${style} bg-[#4FAFCB] text-white leading-[22px] mb-[10px] rounded-[10px]`}
      >
         {text}
      </div>
   );
};

export default ChatTextBox;
