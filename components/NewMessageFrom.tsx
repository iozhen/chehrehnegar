import NewMessageHeading from "./NewMessageHeading";
import PrimaryButtonMessage from "./PrimaryButtonMessage";
import SelectList from "./ReactSelectOption";
import data from "@/data/newMessage.json";

const NewMessageFrom = () => {
   const { Priority } = data;

   return (
      <div className="w-full h-full">
         {/* heading */}
         <div>
            <NewMessageHeading
               title="new message form"
               desc="start a new chat with us to solve your problem"
            />
         </div>

         {/* form */}
         <form className="font-[400] text-[0.97vw] leading-[1.36vh]">
            <div className="grid grid-cols-3 gap-[0.69vh] focus:[&>*]:outline-none mb-[1.46vh]">
               <input
                  type="text"
                  className="h-[4.10vh] px-[1.11vw] border-[#C7CCD0] rounded-[0.55vh] border-[0.07vh]"
                  placeholder="hamed izadi"
               />
               <input
                  type="text"
                  className="h-[4.10vh] px-[1.11vw] border-[#C7CCD0] rounded-[0.55vh] border-[0.07vh]"
                  placeholder="Subject"
               />

               {/* react select option */}
               <SelectList
                  options={Priority}
                  controlStyle={{
                     height: "4.10vh",
                     borderRadius: "0.55vh",
                     background: "white",
                     padding: "0 16px",
                  }}
                  placeholder="Priority"
               />
            </div>

            <textarea
               className="h-[24.22vh] w-full py-[1.46vh] px-[1.11vw] border-[0.07vh] border-[#C7CCD0] rounded-[0.55vh] focus:outline-none mb-[1.95vh]"
               placeholder="Your Message"
            ></textarea>

            <PrimaryButtonMessage title="Submit" />
         </form>
      </div>
   );
};

export default NewMessageFrom;
