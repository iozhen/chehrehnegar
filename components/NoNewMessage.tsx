import { Dispatch, ReactNode, SetStateAction } from "react";
import PrimaryButtonMessage from "./PrimaryButtonMessage";

interface props {
   children: ReactNode;
   setIsMessage: Dispatch<SetStateAction<boolean>>;
}

const NoNewMessage = ({ children, setIsMessage }: props) => {
   return (
      <div className="w-full h-full flex justify-center">
         <div className="text-center mt-[32vh]">
            {children}
            <PrimaryButtonMessage
               title="New Ticket"
               setIsMessage={setIsMessage}
            />
         </div>
      </div>
   );
};

export default NoNewMessage;
