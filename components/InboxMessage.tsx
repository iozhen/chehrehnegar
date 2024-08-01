import data from "@/data/newMessage.json";
import ProfileBox from "./ProfileBox";
import SelectList from "./ReactSelectOption";

const InboxMessage = () => {
   const { inboxItems, open, order } = data;

   return (
      <div className="w-[36.18vw] border-[0.07vw] border-[#D5D9DD] h-fit">
         {/* header */}
         <div className="flex items-center h-[4.88vh] border-b-[0.07vw] border-[#D5D9DD] pl-[1.46vw] pr-[1.39vw] justify-between text-[#031849]">
            <div className="flex gap-[5px]">
               <div className="flex items-center">
                  <img src="/images/inbox.svg" />
                  {/* select component */}
                  <SelectList
                     options={open}
                     controlStyle={{
                        border: "none",
                        background: "none",
                        fontSize: "0.9vw",
                        width: "8.3vw",
                        justifyContent: "center",
                     }}
                     placeholder="Open (99)"
                  />
               </div>
               <div className="flex items-center">
                  <img src="/images/inbox.svg" />
                  {/* select component */}
                  <SelectList
                     options={open}
                     controlStyle={{
                        border: "none",
                        background: "none",
                        fontSize: "0.9vw",
                        width: "8.3vw",
                        justifyContent: "center",
                     }}
                     placeholder="Open (99)"
                  />
               </div>
            </div>

            <div>
               <SelectList
                  options={order}
                  controlStyle={{
                     border: "none !important",
                     background: "none",
                     fontSize: "0.9vw",
                     width: "8vw",
                     justifyContent: "center",
                  }}
                  placeholder="Select order"
               />
            </div>
         </div>

         {/* list */}
         <ul>
            {inboxItems.map(
               ({
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
               }) => (
                  <li className="h-[9.28vh] [&:not(:last-child)]:border-b-[0.07vw] border-[#D3D8DD] flex gap-[1.39vw] items-center pl-[1.39vw]">
                     <div className="flex items-start gap-[1.39vw]">
                        <div className="flex gap-[1.39vw] items-center">
                           <input
                              type="checkbox"
                              className="w-[0.9vw] h-[0.9vw]"
                           />

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
                                 <p className="text-[0.9vw] text-[#031849]">
                                    {title}
                                 </p>
                                 <p className="text-[0.83vw] text-[#4FAFCB]">
                                    {id}
                                 </p>
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
               )
            )}
         </ul>
      </div>
   );
};

export default InboxMessage;
