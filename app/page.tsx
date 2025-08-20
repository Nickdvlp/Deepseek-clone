import AuthButton from "@/components/AuthButton";
import { SidebarTrigger } from "@/components/ui/sidebar";
import connectDb from "@/lib/connectdb";
import Image from "next/image";

export default async function Page() {
  await connectDb();
  return (
    <div className="bg-[#000435] flex-1 flex flex-col items-center justify-center text-white">
      <SidebarTrigger className="absolute top-4 left-5" size="lg" />
      <div className="absolute top-5 right-5">
        <AuthButton />
      </div>
      <div className="flex items-center flex-col gap-2">
        <Image
          src="/deepseek-img.ico"
          alt="deepseek-image"
          width={84}
          height={84}
        />
        <p className="text-2xl font-bold">Hello, I am Deepseek</p>
      </div>
      <p className="text-zinc-300 text-sm mt-1">What's on the agenda today?</p>
      <p className="absolute bottom-7 flex items-center justify-center bg-blue-50 text-black px-6 py-3 rounded-xl font-semibold">
        Select your chat or create new one to start conversation.
      </p>
    </div>
  );
}
