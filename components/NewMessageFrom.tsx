import { useEffect, useState } from "react";
import NewMessageHeading from "./NewMessageHeading";
import PrimaryButtonMessage from "./PrimaryButtonMessage";
import SelectList from "./ReactSelectOption";
import data from "@/data/support.json";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { newMessageSchema } from "@/schema";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface valuesType {
   name: string;
   subject: string;
   priority: string;
   message: string;
}

const NewMessageFrom = () => {
   const [priorityValue, setPriorityVal] = useState("");
   const token = Cookies.get("token");
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
   const router = useRouter();

   const { Priority } = data;

   useEffect(() => {
      if (!token) {
         toast.error("your token has been expired!");
         router.push("/auth/login");
      }
   }, [token]);

   const onFilterChange = (value: string) => setPriorityVal(value);
   const handleSubmit = (values: valuesType) => {
      axios
         .post(
            `${baseUrl}/api/tickets`,
            {
               name: values.name,
               subject: values.subject,
               priority: values.priority,
               description: values.message,
            },
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         )
         .then((res) => {
            toast.success("Ticket send successfully");
         })
         .catch((err) => {
            console.log("====================================");
            console.log(err);
            console.log("====================================");
            toast.error("try again!");
         });
   };

   const initialValue = {
      name: "",
      subject: "",
      priority: "",
      message: "",
   };

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
         <Formik
            validationSchema={newMessageSchema}
            initialValues={initialValue}
            onSubmit={handleSubmit}
         >
            {({ setFieldValue }) => (
               <Form className="font-[400] text-[0.97vw] leading-[1.36vh]">
                  <div className="grid grid-cols-3 gap-[0.69vh] focus:[&>*]:outline-none mb-[1.46vh]">
                     <div>
                        <Field
                           type="text"
                           name="name"
                           className="w-full h-[4.10vh] px-[1.11vw] border-[#C7CCD0] rounded-[0.55vh] border-[0.07vh] focus:outline-none"
                           autoComplete="off"
                           placeholder="hamed izadi"
                        />
                        <div className="text-[red] mt-[5px]">
                           <ErrorMessage name="name" />
                        </div>
                     </div>
                     <div>
                        <Field
                           type="text"
                           name="subject"
                           autoComplete="off"
                           className="w-full h-[4.10vh] px-[1.11vw] border-[#C7CCD0] rounded-[0.55vh] border-[0.07vh] focus:outline-none"
                           placeholder="Subject"
                        />
                        <div className="text-[red] mt-[5px]">
                           <ErrorMessage name="subject" />
                        </div>
                     </div>

                     {/* react select option */}
                     <div>
                        <SelectList
                           options={Priority}
                           controlStyle={{
                              height: "4.10vh",
                              minHeight: "unset",
                              borderRadius: "0.55vh",
                              background: "white",
                              padding: "0 16px",
                           }}
                           placeholder="Priority"
                           name="priority"
                           onFilterChange={onFilterChange}
                           selectedOption={priorityValue}
                           setFieldValue={setFieldValue}
                        />
                        <div className="text-[red] mt-[5px]">
                           <ErrorMessage name="priority" />
                        </div>
                     </div>
                  </div>

                  <div className="mb-[1.95vh]">
                     <Field
                        as="textarea"
                        className="h-[24.22vh] w-full py-[1.46vh] px-[1.11vw] border-[0.07vh] border-[#C7CCD0] rounded-[0.55vh] focus:outline-none"
                        placeholder="Your Message"
                        name="message"
                     ></Field>
                     <div className="text-[red] mt-[5px]">
                        <ErrorMessage name="message" />
                     </div>
                  </div>

                  <PrimaryButtonMessage title="Submit" customType="submit" />
               </Form>
            )}
         </Formik>
      </div>
   );
};

export default NewMessageFrom;
