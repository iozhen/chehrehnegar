import Chat from "@/components/Chat";
import InboxMessage from "@/components/InboxMessage";
import NoChat from "@/components/NoChat";
import { useState } from "react";
import data from "@/data/support.json";

const supportList = () => {
   const [chatSelected, setChatSelected] = useState(0);

   const { inboxItems, chatItem } = data;

   // filter select chat
   const [currentItem] = inboxItems.filter(
      ({ chatId }) => chatId === chatSelected
   );
   const storeAvatar = currentItem?.avatar;
   const [currentChat] = chatItem.filter(
      ({ chatId }) => chatId === chatSelected
   );

   return (
      <div className="px-[40px] py-[32px] h-[calc(100vh-9.76vh)] flex gap-[26px]">
         <InboxMessage setChatSelected={setChatSelected} />

         {chatSelected ? (
            <Chat currentChat={currentChat} storeAvatar={storeAvatar} />
         ) : (
            <NoChat />
         )}
      </div>
   );
};

export default supportList;
