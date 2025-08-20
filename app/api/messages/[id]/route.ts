import Chat from "@/app/models/chatModel";
import connectDb from "@/lib/connectdb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDb();

  const { id } = await context.params;
  try {
    const messages = await Chat.findById(id).select("messages");

    if (!messages) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 401 }
      );
    }

    return NextResponse.json(messages);
  } catch (error) {
    console.log("Chat_Session_Fetch_Error", error);
    return NextResponse.json(
      { error: "Failed to fetch chat sessions" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDb();

  try {
    const { data } = await req.json();

    const { id } = await context.params;

    const updatedChat = await Chat.findByIdAndUpdate(
      id,
      {
        $push: {
          messages: { message: data, response: "" },
        },
      },
      { new: true }
    );

    return NextResponse.json(updatedChat);
  } catch (error) {
    console.error("Save Message Error:", error);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}
