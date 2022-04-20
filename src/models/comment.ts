import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
  },

  phone: {
    type: String,
  },

  comment: {
    type: String,
  }

});

export default mongoose.model("Comment", commentSchema);