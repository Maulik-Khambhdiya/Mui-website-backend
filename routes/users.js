var express = require("express");
var router = express.Router();
var AC = require("../controller/user");

router.post("/", AC.createData);
router.get("/", AC.viewData);

module.exports = router;
