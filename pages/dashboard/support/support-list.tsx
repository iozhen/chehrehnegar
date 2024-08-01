import Chat from "@/components/Chat";
import InboxMessage from "@/components/InboxMessage";
import NoChat from "@/components/NoChat";
import { useState } from "react";

const supportList = () => {
   const [chatSelected, setChatSelected] = useState(false);

   return (
      <div className="px-[40px] py-[32px] h-[calc(100vh-9.76vh)] flex gap-[26px]">
         <InboxMessage />

         {chatSelected ? <Chat /> : <NoChat />}
      </div>
   );
};

export default supportList;
