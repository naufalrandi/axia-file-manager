var express = require('express');
const UploadController = require('../controllers/UploadController');
var router = express.Router();
const auth = require("../middleware/auth");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post(
    "/uploadfile",
    auth.verifyToken,
    UploadController.uploadifle
);

module.exports = router;
