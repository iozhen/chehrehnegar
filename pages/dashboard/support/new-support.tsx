import NewMessageFrom from "@/components/NewMessageFrom";
import NewMessageHeading from "@/components/NewMessageHeading";
import NoNewMessage from "@/components/NoNewMessage";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const newSupport = () => {
   const { t } = useTranslation();
   const [isMessage, setIsMessage] = useState<boolean>(false);
   return (
      <div className="h-[calc(100vh-9.76vh)] px-[2.78vw] pt-[1.86vh]">
         {!isMessage && (
            <NoNewMessage setIsMessage={setIsMessage}>
               <NewMessageHeading
                  title={t("noMessageTitle")}
                  desc={t("noMessageDesc")}
               />
            </NoNewMessage>
         )}

         {isMessage && <NewMessageFrom />}
      </div>
   );
};

export default newSupport;
