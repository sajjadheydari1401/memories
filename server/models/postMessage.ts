import mongoose, { Document, Schema } from "mongoose";

export interface Post extends Document {
  title: string;
  message: string;
  creator: string;
  tags: string[];
  selectedFile: string;
  likeCount: number;
  createdAt: Date;
}

const postSchema = new Schema<Post>({
  title: { type: String, required: true },
  message: { type: String, required: true },
  creator: { type: String, required: true },
  tags: { type: [String], required: true },
  selectedFile: { type: String, required: true },
  likeCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const PostMessage = mongoose.model<Post>("PostMessage", postSchema);

export default PostMessage;
