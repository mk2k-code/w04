const Post = require("../models/modPost");
const User = require("../models/modUser");
const ObjectId = require("mongoose").Types.ObjectId;
// const headers = require("../util/httpHeader");
const { errorHandle, resWriteData } = require("../util/httpMsg");
const { appError } = require("../util/err");

const posts = {
	async getPosts(req, res, next) {
		const timeSort = req.query.timeSort == "asc" ? "createdAt" : "-createdAt";
		const q = req.query.q !== undefined ? { content: new RegExp(req.query.q) } : {};
		const post = await Post.find(q)
			.populate({
				path: "user",
				select: "name photo ",
			})
			.sort(timeSort);
		// res.send('respond with a resource');
		res.status(200).json({
			post,
		});
	},

	async getPost(req, res, next) {
		const id = req.params.id;
		let post;
		if (ObjectId.isValid(id)) {
			// post = await Post.findById(id)
			post = await Post.findById(id).populate({
				path: "user",
				select: "name photo ",
			});
			if (post) {
				res.status(200).json({
					post,
				});
			} else {
				return appError(400, "無此貼文ID", next);
			}
		} else {
			return appError(400, "貼文id格式錯誤，請重新輸入", next);
		}
	},

	async postPost(req, res, next) {
		let userInfo;
		const { user, content, image } = req.body;
		if (ObjectId.isValid(user)) {
			userInfo = await User.findById(user);
		} else {
			return appError(400, "user id格式錯誤，請重新輸入", next);
		}
		if (!userInfo) {
			return appError(400, "無此user id，請重新輸入", next);
		}
		if (content) {
			const newPost = await Post.create({
				user: user,
				content: content,
				image: image || "",
			});
			resWriteData(res, newPost);
		} else {
			// errorHandle(req, res, 40001);
			return appError(400, "沒填寫 content 資料，或欄位名稱不正確", next);
		}
	},

	async delPosts(req, res, next) {
		const posts = await Post.deleteMany({});
		resWriteData(res, posts);
	},

	async delPost(req, res, next) {
		const id = req.params.id;
		let post;
		if (ObjectId.isValid(id)) {
			post = await Post.findById(id);
		} else {
			return appError(400, "貼文id格式錯誤，請重新輸入", next);
		}
		if (post) {
			await Post.findByIdAndDelete(id)
				.then(() => {
					resWriteData(res, post);
					console.log("刪除成功");
				})
				.catch((error) => {
					next(err);
				});
		} else {
			return appError(400, "無此貼文ID", next);
		}
	},

	async patchPost(req, res, next) {
		const id = req.params.id;
		let post;
		const { user, content, image } = req.body;
		if (ObjectId.isValid(id)) {
			post = await Post.findById(id);
		} else {
			return appError(400, "貼文id格式錯誤，請重新輸入", next);
		}
		if (!post) {
			return appError(400, "無此貼文，請重新輸入", next);
		}
		if (content) {
			await Post.findByIdAndUpdate(
				id,
				{
					$set: {
						content: content,
						image: image,
					},
				},
				{ new: true, runValidators: true, useFindAndModify: false }
			)
				.then((result) => {
					resWriteData(res, result);
					console.log(result);
					console.log("更新成功");
				})
				.catch((err) => {
					next(err);
				});
		} else {
			return appError(400, "content 資料，不可空白", next);
		}
	},
};

module.exports = posts;
