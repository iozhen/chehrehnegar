import ChatTextBox from "./ChatTextBox";
import MessageChat from "./MessageChat";
import ProfileBox from "./ProfileBox";

interface prop {
   currentChat: {
      chatId: number;
      firstMessage: string;
      anotherMessage: string[];
      time: string;
   };
   storeAvatar: string;
}

const Chat = ({ currentChat, storeAvatar }: prop) => {
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
            <MessageChat currentChat={currentChat} storeAvatar={storeAvatar} />
         </div>

         {/* ‌box */}
         <div className="shadow-[0_0.2vh_1.17vh_0_#040D241A] h-[10.35vh] rounded-[0.98vh]"></div>
      </div>
   );
};

export default Chat;
