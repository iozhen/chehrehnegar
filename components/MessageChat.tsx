import ChatTextBox from "./ChatTextBox";
import ProfileBox from "./ProfileBox";

interface props {
   currentChat: {
      chatId: number;
      firstMessage: string;
      anotherMessage: string[];
      time: string;
   };
   storeAvatar: string;
}

const MessageChat = ({ currentChat, storeAvatar }: props) => {
   const { firstMessage, anotherMessage, time } = currentChat;

   return (
      <div className="h-[54.39vh] overflow-y-auto px-[1.39vw] py-[3.03vh]">
         <div className="flex gap-[1.39vw]">
            <ProfileBox text={storeAvatar} />
            <div>
               <ChatTextBox
                  text={firstMessage}
                  style="font-[300] text-[0.69vw] pt-[1.56vh] pr-[0.69vw] pb-[1.37vh] pl-[0.76vw] w-fit"
               />

               {/* another message */}
               {anotherMessage.map((text, index) => (
                  <ChatTextBox
                     key={index}
                     text={text}
                     style="font-[700] text-[0.9vw] pt-[1.46vh] pr-[1.18vw] pb-[1.95vh] pl-[1.46vw] w-[25.63vw]"
                  />
               ))}

               <div className="text-[0.83vw] leading-[1.95vh] text-[#031849] font-[700px] text-right">
                  {time}
               </div>
            </div>
         </div>
      </div>
   );
};

export default MessageChat;
