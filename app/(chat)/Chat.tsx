"use client";
import AuthButton from "@/components/AuthButton";
import ChatItem from "@/components/ChatItem";
import PromptBox from "@/components/PromptBox";
import { SidebarTrigger } from "@/components/ui/sidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Messages {
  message: string;
  response: string;
}

const Chat = ({ id }: { id: string }) => {
  const [messages, setMessages] = useState<Messages[]>([]);
  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`/api/messages/${id}`);
        console.log(data);
        setMessages(data.messages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [id]);

  const addMessage = (newMsg: Messages) => {
    setMessages((prev) => [...prev, newMsg]);
  };

  return (
    <div className="w-full">
      <div className="flex h-screen w-full">
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#000435] text-white relative">
          <div className=" absolute px-4 top-6 flex items-center justify-between w-full">
            <SidebarTrigger />
            <AuthButton />
          </div>
          <ChatItem messages={messages} />
          <div className="absolute bottom-6 mx-auto w-full">
            <PromptBox chatId={id} onNewMessage={addMessage} />
          </div>
          <p className="text-xs absolute bottom-1 text-zinc-500">
            AI-generated, for reference only
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
