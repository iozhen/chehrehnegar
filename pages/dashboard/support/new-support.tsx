import NewMessageFrom from "@/components/NewMessageFrom";
import NewMessageHeading from "@/components/NewMessageHeading";
import NoNewMessage from "@/components/NoNewMessage";
import { useState } from "react";

const newSupport = () => {
   const [isMessage, setIsMessage] = useState<boolean>(false);
   return (
      <div className="h-[calc(100vh-9.76vh)] px-[2.78vw] pt-[1.86vh]">
         {!isMessage && (
            <NoNewMessage setIsMessage={setIsMessage}>
               <NewMessageHeading
                  title="no message here!"
                  desc="start a new chat with us to solve your problem"
               />
            </NoNewMessage>
         )}

         {isMessage && <NewMessageFrom />}
      </div>
   );
};

export default newSupport;
