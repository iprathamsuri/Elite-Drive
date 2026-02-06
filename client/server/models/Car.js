import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  name: String,
  type: String,
  year: Number,
  seats: Number,
  fuel: String,
  gear: String,
  location: String,
  price: Number,
  image: String,

  ownerEmail: {
    type: String,
    required: true
  }
});

export default mongoose.model("Car", carSchema);
