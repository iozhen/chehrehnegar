import Chat from "@/components/Chat";
import InboxMessage from "@/components/InboxMessage";
import NoChat from "@/components/NoChat";
import { useState } from "react";
import data from "@/data/support.json";
import { useTranslation } from "react-i18next";

interface chatItemProps {
   chatId: number;
   time: string;
   firstMessage: string;
   anotherMessage: string[];
}

const supportList = () => {
   const [chatSelected, setChatSelected] = useState(0);

   const { inboxItems, chatItem } = data;
   const { t } = useTranslation();
   const chatItems = t("chatItem", { returnObjects: true }) as chatItemProps[];

   // filter select chat
   const [currentItem] = inboxItems.filter(
      ({ chatId }) => chatId === chatSelected
   );
   const storeAvatar = currentItem?.avatar;
   const [currentChat] = chatItems.filter(
      ({ chatId }) => chatId === chatSelected
   );

   return (
      <div className="px-[40px] py-[32px] h-[calc(100vh-9.76vh)]">
         <div className="flex gap-[26px]">
            <InboxMessage setChatSelected={setChatSelected} />

            {chatSelected ? (
               <Chat currentChat={currentChat} storeAvatar={storeAvatar} />
            ) : (
               <NoChat />
            )}
         </div>
      </div>
   );
};

export default supportList;
