const express = require("express");
const router = express.Router();
router.use("/Users", require("./UserRouter"));
module.exports = router;
