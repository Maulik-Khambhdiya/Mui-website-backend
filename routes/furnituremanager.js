var express = require("express");
var router = express.Router();
var AC = require("../controller/furniture");
var multer=require("multer")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images"); //====> change directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});


const upload = multer({ storage: storage });

router.post("/",upload.single('image'), AC.createData);
router.get("/", AC.viewData);

module.exports = router;