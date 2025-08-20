import User from "@/app/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { name, email, picture } = await req.json();

    if (!name || !email || !picture) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, picture)" },
        { status: 400 }
      );
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        imageUrl: picture,
      });
    }
    return NextResponse.json(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log("Create_User", error);
  }
}
