import Chat from "@/components/Chat";
import InboxMessage from "@/components/InboxMessage";
import NoChat from "@/components/NoChat";
import { useEffect, useState } from "react";
import data from "@/data/support.json";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setTickets } from "@/redux/slices/TicketSlice";

const supportList = () => {
   const [chatSelected, setChatSelected] = useState(0);

   const { inboxItems, chatItem } = data;
   const tickets = useSelector((state: any) => state.ticket.tickets);

   // filter select chat
   const [currentItem] = inboxItems.filter(
      ({ chatId }) => chatId === chatSelected
   );
   const storeAvatar = currentItem?.avatar;
   const [currentChat] = chatItem.filter(
      ({ chatId }) => chatId === chatSelected
   );
   const token = Cookies.get("token");
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
   const router = useRouter();
   const dispatch = useDispatch();

   useEffect(() => {
      if (!token) {
         toast.error("your token has been expired!");
         router.push("/auth/login");
      }
   }, [token]);

   useEffect(() => {
      axios
         .get(`${baseUrl}/api/tickets`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res) => {
            dispatch(setTickets(res.data.tickets));
         })
         .catch((err) => {
            console.log("====================================");
            console.log(err);
            console.log("====================================");
         });
   }, []);

   return (
      <div className="px-[40px] py-[32px] h-[calc(100vh-9.76vh)] flex gap-[26px]">
         <InboxMessage setChatSelected={setChatSelected} />

         {chatSelected ? (
            <Chat currentChat={currentChat} storeAvatar={storeAvatar} />
         ) : (
            <NoChat />
         )}
      </div>
   );
};

export default supportList;
