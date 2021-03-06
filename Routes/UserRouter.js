const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  addUser,
  authenticateUser,
  saveHotel,
  addReview,
  removeSaved,
  showAllHotels,
} = require("../dboperations");
router.get("/GetAllUsers", getAllUsers);
router.get("/ShowAllHotels", showAllHotels);
router.post("/CreateUser", addUser);
router.post("/Authenticate", authenticateUser);
router.post("/SaveHotel", saveHotel);
router.post("/UnsaveHotel", removeSaved);
router.post("/AddReview", addReview);
module.exports = router;
