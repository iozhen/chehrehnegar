import { useEffect, useState } from "react";
import ChatTextBox from "./ChatTextBox";
import MessageChat from "./MessageChat";
import ProfileBox from "./ProfileBox";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

interface prop {
  currentChat: {
    chatId: number;
    firstMessage: string;
    anotherMessage: string[];
    time: string;
  };
  storeAvatar: string;
}

const Chat = ({ currentChat, storeAvatar }: prop) => {
  const [message, setMessage] = useState("");
  const token = Cookies.get("token");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const tickets = useSelector((state: any) => state.ticket.tickets);

  const newMessage = () => {
    axios
      .post(
        `${baseUrl}/api/tickets`,
        {
          // ticketId : tickets.
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

  return (
    <div className="h-[69.82vh] w-[39.10vw] flex flex-col justify-between">
      {/* header */}
      <div>
        <div className="flex gap-[2.01vw] items-center border-[#D5D9DD] border-b-[0.07vw] pb-[1.17vh] px-[1.39vw]">
          <div>
            <ProfileBox text="D" />
          </div>
          <div className="flex gap-[0.56vw] items-center">
            <img src="/images/messageFill.svg" /> Hamed Izadi
          </div>
        </div>

        {/* chat */}
        <MessageChat currentChat={currentChat} storeAvatar={storeAvatar} />
      </div>

      {/* ‌box */}
      <div className="relative w-full">
        <textarea
          className="shadow-[0_0.2vh_1.17vh_0_#040D241A] h-[10.35vh] rounded-[0.98vh] p-[1.5vh] w-full text-[11.5px] font-light"
          placeholder="write message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></textarea>
        <div className="absolute bottom-[20%] right-[2%] flex items-center gap-[10px] ">
          <button className="shadow-md flex items-center justify-center w-[26px] h-[26px] rounded-full">
            <img src="/icons/file.svg" alt="" />
          </button>
          <button className="shadow-md flex items-center justify-center w-[26px] h-[26px] rounded-full">
            <img src="/icons/send.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
