var express = require("express");
var router = express.Router();
const Post = require("../models/modPost");
const postsCtl = require("../controllers/posts");
const {handleErrorAsync} = require("../util/err");


router.get("/", function (req, res, next) {
	handleErrorAsync(postsCtl.getPosts(req, res, next));
});

router.get("/:id", function (req, res, next) {
	handleErrorAsync(postsCtl.getPost(req, res, next));
});

router.post("/", function (req, res, next) {
	handleErrorAsync(postsCtl.postPost(req, res, next));
});

router.delete("/", function (req, res, next) {
	handleErrorAsync(postsCtl.delPosts(req, res, next));
});

router.delete("/:id", function (req, res, next) {
	handleErrorAsync(postsCtl.delPost(req, res, next));
});

router.patch("/:id", function (req, res, next) {
	handleErrorAsync(postsCtl.patchPost(req, res, next));
});

module.exports = router;
