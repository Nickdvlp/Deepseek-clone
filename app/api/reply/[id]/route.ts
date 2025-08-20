import { NextResponse } from "next/server";
import Chat from "@/app/models/chatModel";
import connectDb from "@/lib/connectdb";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDb();

  try {
    const { data } = await req.json();
    const { id } = await context.params;
    const updatedChat = await Chat.findByIdAndUpdate(
      id,
      { $set: { "messages.$[last].response": data } },
      {
        new: true,
        arrayFilters: [{ "last.response": "" }],
      }
    );
    console.log(updatedChat);
    return NextResponse.json(updatedChat);
  } catch (error) {
    console.error("Save Reply Error:", error);
    return NextResponse.json(
      { error: "Failed to save reply" },
      { status: 500 }
    );
  }
}
