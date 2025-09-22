var express = require("express");
var router = express.Router();
var AC = require("../controller/user");
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

router.post("/",upload.single('profile'), AC.createData);
router.get("/", AC.viewData);
router.delete("/:id", AC.deleteData);
router.patch("/:id",upload.single("profile"), AC.editData);
router.post("/login",AC.loginUser)

module.exports = router;
