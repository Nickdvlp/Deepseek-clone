"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

interface ChatSessionItem {
  _id: string;
  title: string;
}
interface ChatSessionsProps {
  Chatsessions: ChatSessionItem[];
  selectedChatId: string;
  onSelect: (id: string) => void;
}
const ChatSessions = ({
  Chatsessions,
  selectedChatId,
  onSelect,
}: ChatSessionsProps) => {
  const router = useRouter();
  const handleClick = (id: string) => {
    router.push(`/chat/${id}`);
  };
  return (
    <div className="*:px-4 *:mx-3  *:py-2 *:my-2  text-zinc-200">
      {Chatsessions?.map((chatsession) => (
        <div
          key={chatsession._id}
          onClickCapture={() => onSelect(chatsession._id)}
          className={cn(
            selectedChatId === chatsession._id
              ? "bg-blue-200 text-black"
              : "bg-[#1a1a40] text-zinc-400 hover:bg-blue-950",
            " rounded-md cursor-pointer"
          )}
          onClick={() => handleClick(chatsession._id)}
        >
          {chatsession.title}
        </div>
      ))}
    </div>
  );
};

export default ChatSessions;
