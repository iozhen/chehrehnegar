import { Dispatch, ReactNode, SetStateAction } from "react";
import PrimaryButtonMessage from "./PrimaryButtonMessage";
import { useTranslation } from "react-i18next";

interface props {
   children: ReactNode;
   setIsMessage: Dispatch<SetStateAction<boolean>>;
}

const NoNewMessage = ({ children, setIsMessage }: props) => {
   const { t } = useTranslation();

   return (
      <div className="w-full h-full flex justify-center">
         <div className="text-center mt-[32vh]">
            {children}
            <PrimaryButtonMessage
               title={t("noMessageBtn")}
               setIsMessage={setIsMessage}
            />
         </div>
      </div>
   );
};

export default NoNewMessage;
