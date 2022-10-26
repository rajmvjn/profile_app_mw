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
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Blog", blogSchema);
