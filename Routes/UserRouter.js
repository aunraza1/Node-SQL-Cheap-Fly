const express = require("express");
const router = express.Router();
const { getAllUsers, addUser, authenticateUser } = require("../dboperations");
router.get("/GetAllUsers", getAllUsers);
router.post("/CreateUser", addUser);
router.post("/Authenticate", authenticateUser);
module.exports = router;
