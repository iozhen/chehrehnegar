import { Dispatch, SetStateAction } from "react";
import ProfileBox from "./ProfileBox";

interface props {
   chatId: number;
   open: boolean;
   close: boolean;
   avatar: string;
   overdue: string;
   ago: string;
   respond: string;
   title: string;
   id: string;
   sender: string;
   messageIco: string;
   company: string;
   created: string;
   setChatSelected: Dispatch<SetStateAction<number>>;
}

const InboxItem = ({
   chatId,
   avatar,
   overdue,
   ago,
   respond,
   title,
   id,
   sender,
   messageIco,
   company,
   created,
   setChatSelected,
}: props) => {
   return (
      <li
         onClick={() => setChatSelected(chatId)}
         className="h-[9.28vh] [&:not(:last-child)]:border-b-[0.07vw] border-[#D3D8DD] flex gap-[1.39vw] items-center pl-[1.39vw] cursor-pointer"
      >
         <div className="flex items-start gap-[1.39vw]">
            <div className="flex gap-[1.39vw] items-center">
               <ProfileBox text={avatar} />
            </div>

            <div className="flex gap-[1.39vw]">
               <div className="text-[0.76vw] flex flex-col gap-[0.49vh]">
                  {/* badge */}
                  <div className="flex items-center gap-[0.49vh] [&>*]:border-[0.07vh] [&>*]:rounded-[0.29vh] [&>*]:flex [&>*]:items-center [&>*]:px-[0.35vw] h-[1.56vh]">
                     {overdue && (
                        <div className="text-[#C82024] bg-[#FED5DB] border-[#FED5DB] h-full">
                           {overdue}
                        </div>
                     )}
                     {ago && (
                        <div className="text-[#2C5EC6] border-[#B3C0DD] bg-[#CCDAF9] h-full">
                           {ago}
                        </div>
                     )}
                     {respond && (
                        <div className="text-[#2C5EC6] border-[#B3C0DD] bg-[#CCDAF9] h-full">
                           {respond}
                        </div>
                     )}
                  </div>

                  {/* title */}
                  <div className="font-[400] flex gap-[0.69vh]">
                     <p className="text-[0.9vw] text-[#031849]">{title}</p>
                     <p className="text-[0.83vw] text-[#4FAFCB]">{id}</p>
                  </div>

                  {/* desc */}
                  <div className="text-[#9AA3AB] flex items-center gap-[0.42vw]">
                     {sender && (
                        <div className="flex gap-[0.42vw] items-center">
                           <img src={messageIco} />
                           {sender}
                        </div>
                     )}
                     <img
                        src="/images/circle.svg"
                        className="[&:last-child]:hidden"
                     />
                     {company && (
                        <p className="flex items-center gap-[0.42vw]">
                           {company}{" "}
                        </p>
                     )}
                     <img
                        src="/images/circle.svg"
                        className="[&:last-child]:hidden"
                     />
                     {created && <p>{created}</p>}
                  </div>
               </div>
            </div>
         </div>
      </li>
   );
};

export default InboxItem;
