const mongoose = require("mongoose");
// Schema 守門員
const postSchema = new mongoose.Schema(
  {
    // - user：貼文姓名
    // - tags：貼文標籤
    // - type：貼文種類[fan(粉絲)、group(社團)]
    // - image：貼文圖片
    // - createdAt：發文時間
    // - content：貼文內容
    // - likes：按讚數
    // - comments：留言數

    user: {
      type: mongoose.Schema.ObjectId,
      ref:"user",
      required: [true, '貼文 ID 未填寫']
    },
    image: {
      type: String,
      default: ""
    },
    createAt: {
      type: Date,
      default: Date.now,
      select: false
    },
    content: {
      type: String,
      required: [true, 'Content 未填寫'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref:"user",
      required: [true, '貼文 ID 未填寫']
    },
    likes: {
      type: Number,
      default: 0
    }
  },
  {
    versionKey: false
  }
)

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

