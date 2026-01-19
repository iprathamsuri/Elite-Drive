import express from "express";
import {
  createBooking,
  getUserBookings,
  deleteBooking,
  getOwnerBookings
} from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/:email", getUserBookings);          // customer bookings
router.get("/owner/:email", getOwnerBookings);   // owner bookings
router.delete("/:id", deleteBooking);

export default router;
