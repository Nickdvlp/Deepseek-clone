import { model, models, Schema } from "mongoose";

interface UserModelType {
  name: string;
  email: string;
  imageUrl: string;
}

const userModel = new Schema<UserModelType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = models.User || model<UserModelType>("User", userModel);

export default User;
