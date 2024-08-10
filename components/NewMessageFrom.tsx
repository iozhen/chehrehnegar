import { useState } from "react";
import NewMessageHeading from "./NewMessageHeading";
import PrimaryButtonMessage from "./PrimaryButtonMessage";
import SelectList from "./ReactSelectOption";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

interface valuesType {
   name: string;
   subject: string;
   priority: string;
   message: string;
}

const NewMessageFrom = () => {
   const [priorityValue, setPriorityVal] = useState("");

   const onFilterChange = (value: string) => setPriorityVal(value);
   const handleSubmit = (values: valuesType) => console.log(values);
   const { t } = useTranslation();
   const optionsPriority = t("priority", { returnObjects: true }) as string[];

   const initialValue = {
      name: t("newMessageName"),
      subject: "",
      priority: "",
      message: "",
   };

   const newMessageSchema = Yup.object().shape({
      name: Yup.string()
         .min(3, t("newMessageNameErrorMin"))
         .required(t("newMessageNameErrorReq")),
      subject: Yup.string()
         .min(3, t("newMessageSubjectErrorMin"))
         .required(t("newMessageSubjectErrorReq")),
      message: Yup.string()
         .min(5, t("newMessageErrorMin"))
         .required(t("newMessageErrorReq")),
      priority: Yup.string().required(t("newMessagePriorityErrorReq")),
   });

   return (
      <div className="w-full h-full">
         {/* heading */}
         <div>
            <NewMessageHeading
               title={t("newMessageHeading")}
               desc={t("newMessageDesc")}
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
                           placeholder={t("newMessageSubject")}
                        />
                        <div className="text-[red] mt-[5px]">
                           <ErrorMessage name="subject" />
                        </div>
                     </div>

                     {/* react select option */}
                     <div>
                        <SelectList
                           options={optionsPriority}
                           controlStyle={{
                              height: "4.10vh",
                              minHeight: "unset",
                              borderRadius: "0.55vh",
                              background: "white",
                              padding: "0 16px",
                           }}
                           placeholder={t("newMessagePriority")}
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
                        placeholder={t("newMessageTextArea")}
                        name="message"
                     ></Field>
                     <div className="text-[red] mt-[5px]">
                        <ErrorMessage name="message" />
                     </div>
                  </div>

                  <PrimaryButtonMessage
                     title={t("newMessageSubmitBtn")}
                     customType="submit"
                  />
               </Form>
            )}
         </Formik>
      </div>
   );
};

export default NewMessageFrom;
