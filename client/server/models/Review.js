import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: String,
  email: String,     // ✅ instead of image
  location: String,
  rating: Number,
  text: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Review", reviewSchema);
