let mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: String,
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }]
  });
module.exports=mongoose.model('User', UserSchema);