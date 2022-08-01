import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  blogs: {
    fieldTypes: [],
    fieldValues: [],
  },
  comments: [
    {
      userId: String,
      comment: String,
    },
  ],
});

export default mongoose.model("Blog", blogSchema);
