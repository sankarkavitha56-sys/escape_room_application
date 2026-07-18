const express = require("express");
const router = express.Router();
const { createBooking, getBookings, cancelBooking } = require("../controllers/bookingController");
const validateBooking = require("../middleware/validateBooking");

router.post("/", validateBooking, createBooking);
router.get("/", getBookings);
router.delete("/:id", cancelBooking);

module.exports = router;
