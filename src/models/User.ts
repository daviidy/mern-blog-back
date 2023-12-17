import { Document, Schema, model } from 'mongoose';

// Define the User schema
export interface User {
  username: string;
  password: string;
  email: string;
  profile_image: string;
}

// Define the UserDocument interface
export interface UserDocument extends Document, User {}

// Create the User schema
const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String,
    default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/800px-User-avatar.svg.png',
  },
});

// Create and export the User model
export const UserModel = model<UserDocument>('User', userSchema);
