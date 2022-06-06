var express = require("express");
var router = express.Router();
// const Post = require("../models/modPost");
const usersCtl = require("../controllers/users");
const {handleErrorAsync} = require("../util/err");


router.get("/", function (req, res, next) {
	handleErrorAsync(usersCtl.getPosts(req, res, next));
});

module.exports = router;
