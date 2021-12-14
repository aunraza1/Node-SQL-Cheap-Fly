const express = require("express");
const router = express.Router();
const { addHotel, showVendorHotels, addRooms } = require("../dboperations");
router.post("/AddHotel", addHotel);
router.get("/ShowHotels/:userId", showVendorHotels);
router.post("/AddRooms", addRooms);

module.exports = router;
