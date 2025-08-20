import { model, models, Schema, Types } from "mongoose";

interface MessageType {
  message: string;
  response: string;
}

interface ChatModelType {
  title: string;
  messages: MessageType[];
  user: Types.ObjectId;
}

const chatModel = new Schema<ChatModelType>(
  {
    title: {
      type: String,
      required: true,
    },
    messages: [
      {
        message: {
          type: String,
          required: true,
        },
        response: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Chat = models.Chat || model<ChatModelType>("Chat", chatModel);

export default Chat;
