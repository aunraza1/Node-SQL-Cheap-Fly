const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  addUser,
  authenticateUser,
  saveHotel,
  addHotelReview,
  removeSaved,
  showAllHotels,
} = require("../dboperations");
router.get("/GetAllUsers", getAllUsers);
router.get("/ShowAllHotels", showAllHotels);
router.post("/CreateUser", addUser);
router.post("/Authenticate", authenticateUser);
router.post("/SaveHotel", saveHotel);
router.post("/UnsaveHotel", removeSaved);
router.post("/AddHotelReview", addHotelReview);
module.exports = router;
