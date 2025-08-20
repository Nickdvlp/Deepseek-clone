"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface Messages {
  message: string;
  response: string;
}

const ChatItem = ({ messages }: { messages: Messages[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {messages.length === 0 ? (
        <>
          <div className="flex items-center flex-col gap-2">
            <Image
              src="/deepseek-img.ico"
              alt="deepseek-image"
              width={84}
              height={84}
            />
            <p className="text-2xl font-bold">Hello, I am Deepseek</p>
          </div>
          <p className="text-zinc-300 text-sm mt-1">
            What's on the agenda today?
          </p>
        </>
      ) : (
        <div
          className="max-h-[50vh] overflow-y-scroll scrollbar-hide"
          ref={scrollRef}
        >
          {messages.map((msg, i) => (
            <div>
              <p
                key={i}
                className="bg-purple-950 w-fit text-white mb-6 px-2 rounded-xl py-4 font-semibold"
              >
                {msg.message}
              </p>
              <p
                key={i}
                className="bg-purple-300 w-fit text-black mb-6 px-2 rounded-xl py-4 font-semibold"
              >
                {msg.response}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ChatItem;
