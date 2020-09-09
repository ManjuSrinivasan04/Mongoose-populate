let mongoose=require('mongoose');
const PostSchema = new mongoose.Schema({
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  });

module.exports= mongoose.model('Post', PostSchema);