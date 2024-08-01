import ChatTextBox from "./ChatTextBox";
import ProfileBox from "./ProfileBox";

const Chat = () => {
   return (
      <div className="h-[69.82vh] w-[39.10vw] flex flex-col justify-between">
         {/* header */}
         <div>
            <div className="flex gap-[2.01vw] items-center border-[#D5D9DD] border-b-[0.07vw] pb-[1.17vh] px-[1.39vw]">
               <div>
                  <ProfileBox text="D" />
               </div>
               <div className="flex gap-[0.56vw] items-center">
                  <img src="/images/messageFill.svg" /> Hamed Izadi
               </div>
            </div>

            {/* chat */}
            <div className="px-[1.39vw] mt-[3.03vh]">
               <div className="flex gap-[1.39vw]">
                  <ProfileBox text="D" />
                  <div>
                     <ChatTextBox
                        text="UI/UX Designer Needs…"
                        style="font-[300] text-[0.69vw] pt-[1.56vh] pr-[0.69vw] pb-[1.37vh] pl-[0.76vw] w-fit"
                     />
                     <ChatTextBox
                        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad "
                        style="font-[700] text-[0.9vw] pt-[1.46vh] pr-[1.18vw] pb-[1.95vh] pl-[1.46vw] w-[25.63vw]"
                     />
                     <div className="text-[0.83vw] leading-[1.95vh] text-[#031849] font-[700px] text-right">
                        3 days ago
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* ‌box */}
         <div className="shadow-[0_0.2vh_1.17vh_0_#040D241A] h-[10.35vh] rounded-[0.98vh]"></div>
      </div>
   );
};

export default Chat;
