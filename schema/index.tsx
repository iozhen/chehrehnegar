import * as Yup from "yup";

export const newMessageSchema = Yup.object().shape({
   name: Yup.string()
      .min(3, "Name is must be 3 character")
      .required("Name is required!"),
   subject: Yup.string()
      .min(3, "Subject is must be 3 character")
      .required("Subject is required!"),
   message: Yup.string()
      .min(5, "Message is must be 5 character")
      .required("Message is required!"),
   priority: Yup.string().required("Priority is required!"),
});
