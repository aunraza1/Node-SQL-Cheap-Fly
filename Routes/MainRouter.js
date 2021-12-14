const express = require("express");
const router = express.Router();
router.use("/User", require("./UserRouter"));
router.use("/Vendor",require('./VendorRoute'))
module.exports = router;
