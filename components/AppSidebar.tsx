"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUser } from "@auth0/nextjs-auth0";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import ChatSessions from "./ChatSessions";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";

function AppSidebar() {
  const { state } = useSidebar();
  const { user } = useUser();
  const [isChatInputOpen, setIsChatInputOpen] = useState(false);
  const [chatSessionValue, setChatSessionValue] = useState("");
  const [chatSessions, setChatSessions] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState<string>("");

  const router = useRouter();

  const handleOpenChatInput = () => {
    setIsChatInputOpen(true);
  };

  const fetchSessions = async () => {
    if (!user) {
      return;
    }
    const { data } = await axios.get("/api/chatSession");
    setChatSessions(data);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!user) {
      return alert("Please login first to add new chat!");
    }
    try {
      const { data } = await axios.post("/api/chatSession", {
        title: chatSessionValue,
        user: user,
      });
      setChatSessionValue("");
      setIsChatInputOpen(false);
      console.log(data);
      setSelectedChatId(data._id);
      router.push(`/chat/${data._id}`);
      fetchSessions();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [user]);

  const handleSelectSession = (id: string) => {
    setSelectedChatId(id);
    router.push(`/chat/${id}`);
    // You can also notify parent to load this chat if needed
  };

  return (
    <Sidebar className="bg-[#000435]">
      <SidebarHeader>
        {state === "expanded" ? (
          <div
            className="flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => {
              router.push("/");
              setSelectedChatId("");
            }}
          >
            <Image
              src="/deepseek-img.ico"
              width={24}
              height={24}
              alt="Deepseek"
            />
            <h2 className="text-white font-bold">Deepseek</h2>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Image
              src="/deepseek-img.ico"
              width={24}
              height={24}
              alt="Deepseek"
            />
          </div>
        )}
      </SidebarHeader>

      {/* Menu Items */}
      <SidebarContent>
        <SidebarGroup>
          {isChatInputOpen ? (
            <form onSubmit={handleSubmit}>
              <Input
                placeholder="Create new chat"
                className="text-white"
                value={chatSessionValue}
                onChange={(e) => setChatSessionValue(e.target.value)}
              />
              <X
                size={20}
                onClick={() => setIsChatInputOpen(false)}
                className="text-zinc-500 text-xs absolute right-4 top-4"
              />
            </form>
          ) : (
            <button
              className={`flex items-center rounded-md transition-all duration-200 hover:bg-blue-950 ${
                state === "expanded" ? "gap-3 px-4 py-3" : "justify-center p-3"
              }`}
              onClick={handleOpenChatInput}
            >
              <Plus className="h-5 w-5 text-white shrink-0" />
              {state === "expanded" && (
                <span className="text-zinc-100 text-sm">New Chat</span>
              )}
            </button>
          )}
        </SidebarGroup>
        <ChatSessions
          Chatsessions={chatSessions}
          selectedChatId={selectedChatId}
          onSelect={handleSelectSession}
        />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        {user &&
          (state === "expanded" ? (
            <div className="flex items-center justify-center gap-3 text-white mb-3 cursor-pointer">
              <Image
                src={user?.picture as string}
                alt={user?.name as string}
                width={34}
                height={34}
                className="rounded-full md:w-8 md:h-8"
              />
              <p className="text-blue-100 font-semibold">{user?.name}</p>
            </div>
          ) : (
            <div className="flex justify-center mb-3 text-white">
              <Image
                src={user?.picture as string}
                alt={user?.name as string}
                width={24}
                height={24}
                className="rounded-full md:w-8 md:h-8"
              />
            </div>
          ))}
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
