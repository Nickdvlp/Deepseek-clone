import Chat from "@/app/models/chatModel";
import User from "@/app/models/userModel";
import { auth0 } from "@/lib/auth0";
import { NextResponse, userAgent } from "next/server";

export async function GET() {
  try {
    const session = await auth0.getSession();

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const user = await User.findOne({ email: session?.user?.email });

    if (!userAgent) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const chatSessions = await Chat.find({ user: user._id });
    return NextResponse.json(chatSessions);
  } catch (error) {
    console.log("Chat_Session_Fetch_Error", error);
    return NextResponse.json(
      { error: "Failed to fetch chat sessions" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, res: Response) {
  try {
    const { title, user } = await req.json();

    const userFromDb = await User.findOne({ email: user.email });

    if (!userFromDb) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const createSession = await Chat.create({
      title: title?.trim() || "New Chat",
      messages: [],
      user: userFromDb._id,
    });

    return NextResponse.json(createSession);
  } catch (error) {
    console.log("Chat_Session_Creation_Error", error);
    return NextResponse.json(
      { error: "Failed to create chat session" },
      { status: 500 }
    );
  }
}
