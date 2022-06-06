const User = require("../models/modUser");
// const ObjectId = require("mongoose").Types.ObjectId;
// const headers = require("../util/httpHeader");
// const { errorHandle, resWriteData } = require("../util/httpMsg");
const { appError } = require("../util/err");

const users = {
  /* GET users listing. */
  async getPosts(req, res, next) {
    const users =  await User.find();
    res.status(200).json({
      data: users
    })
  }
};

module.exports = users;