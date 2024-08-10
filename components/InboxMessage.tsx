import data from "@/data/support.json";
import ProfileBox from "./ProfileBox";
import SelectList from "./ReactSelectOption";
import InboxItem from "./InboxItem";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { displayStatus, initialDataProps, sortedFunc } from "./inboxOperation";
import { useTranslation } from "react-i18next";

interface props {
   setChatSelected: Dispatch<SetStateAction<number>>;
}

const InboxMessage = ({ setChatSelected }: props) => {
   const { t } = useTranslation();
   const openInitial = t("open", { returnObjects: true }) as string[];
   const orderInitial = t("order", { returnObjects: true }) as string[];
   const initialState = {
      show1: openInitial[0],
      show2: "",
      order: orderInitial[0],
   };
   const [values, setValues] = useState(initialState);
   const [filteredInbox, setFilteredInbox] = useState<initialDataProps[]>();
   const allInboxItem = t("inboxItems", {
      returnObjects: true,
   }) as initialDataProps[];
   const headerOptions = t("open", { returnObjects: true }) as string[];
   const headerOrder = t("order", { returnObjects: true }) as string[];

   // on filter change
   const onFilterChange = (value: string, name: string) =>
      setValues({ ...values, [name]: value });

   useEffect(() => {
      const result1 = sortedFunc(values.order, allInboxItem);
      setFilteredInbox(displayStatus(result1, values.show1));
   }, [values]);

   return (
      <div className="w-[36.18vw] border-[0.07vw] border-[#D5D9DD] h-fit">
         {/* header */}
         <div className="flex items-center h-[4.88vh] border-b-[0.07vw] border-[#D5D9DD] pl-[1.46vw] pr-[1.39vw] justify-between text-[#031849]">
            <div className="flex gap-[5px]">
               <div className="flex items-center">
                  <img src="/images/inbox.svg" />
                  {/* select component */}
                  <SelectList
                     options={headerOptions}
                     controlStyle={{
                        border: "none",
                        background: "none",
                        fontSize: "0.9vw",
                        width: "8.3vw",
                        justifyContent: "center",
                        cursor: "pointer",
                     }}
                     selectedOption={values.show1}
                     quantity={filteredInbox?.length}
                     onFilterChange={onFilterChange}
                     name="show1"
                  />
               </div>

               <div className="flex items-center">
                  <img src="/images/inbox.svg" />
                  {/* select component */}
                  <SelectList
                     options={headerOptions}
                     controlStyle={{
                        border: "none",
                        background: "none",
                        fontSize: "0.9vw",
                        width: "8.3vw",
                        justifyContent: "center",
                        cursor: "pointer",
                     }}
                     selectedOption={values.show2}
                     onFilterChange={onFilterChange}
                  />
               </div>
            </div>

            <div>
               <SelectList
                  options={headerOrder}
                  controlStyle={{
                     border: "none",
                     background: "none",
                     fontSize: "0.9vw",
                     width: "8vw",
                     justifyContent: "center",
                     cursor: "pointer",
                  }}
                  placeholder="Select order"
                  selectedOption={values.order}
                  onFilterChange={onFilterChange}
                  name="order"
               />
            </div>
         </div>

         {/* list */}
         <ul className="max-h-[64.94vh] overflow-y-auto">
            {filteredInbox?.map((item, index) => (
               <InboxItem
                  {...item}
                  key={index}
                  setChatSelected={setChatSelected}
               />
            ))}
         </ul>
      </div>
   );
};

export default InboxMessage;
