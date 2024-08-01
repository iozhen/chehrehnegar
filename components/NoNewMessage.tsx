import { ReactNode } from "react";
import PrimaryButtonMessage from "./PrimaryButtonMessage";

interface props {
   children: ReactNode;
}

const NoNewMessage = ({ children }: props) => {
   return (
      <div className="w-full h-full flex justify-center">
         <div className="text-center mt-[32vh]">
            {children}
            <PrimaryButtonMessage title="New Ticket" />
         </div>
      </div>
   );
};

export default NoNewMessage;
