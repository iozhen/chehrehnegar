const NoChat = () => {
   return (
      <div className="flex justify-center items-center w-[39.2vw]">
         <div className="text-[#031849] text-center">
            <img
               src="/images/noMessage.png"
               className="w-[19.7vw] h-[21.4vh] mb-[2.6vh]"
            />
            <p className="font-[400] text-[1.7vw] leading-[2vw] mb-[1.4vh]">
               Hey Hamed!
            </p>
            <p className="font-[400] text-[1vw] leading-[1.8vh] italic">
               time to chat with us.
            </p>
            <div className="relative mt-[4.2vh]">
               <img
                  src="/images/arrowHelp.svg"
                  className="w-[4vw] h-[4.6vh] absolute left-[-2.8vw] top-[-2vh]"
               />
               <p className="w-[20vw] text-[1.25vw] font-[400] leading-[2.5vh] text-center text-[#0067FF] rotate-[-5deg]">
                  Click on a conversation to get started
               </p>
            </div>
         </div>
      </div>
   );
};

export default NoChat;
