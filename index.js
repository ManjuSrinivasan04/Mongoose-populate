let express =require('express');
let app=express();
let bodyParser=require('body-parser');
let mongoose=require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let User=require('./user');
let Post=require('./post');

const port=5000;


mongoose.connect("mongodb://localhost:27017/schemaModel-mongoose",(err)=>{
    if(!err)
        console.log("Server Connected to Mongodb");
    
});

app.get('/',(req,res)=>{
    res.send("And now you are in Home Page");
});


app.post('/adduser',(req,res)=>{
    console.log("Adding new user");
    let UserObj = {
        "username":req.body.username,
        "posts":new mongoose.Types.ObjectId()
    }
    let newUser=new User(UserObj);
    newUser.save((err,user)=>{
        if(err)
           res.status(400).send("There is an error while adding new User");
        else
           res.status(200).json(user);
    });
});

app.post('/addpost',(req,res)=>{
    console.log("Adding new Post");
    let PostObj = {
        "content":req.body.content,
        "author":new mongoose.Types.ObjectId()
    }
    let newPost=new Post(PostObj);
    newPost.save((err,post)=>{
        if(err)
           res.status(400).send("There is an error while adding new Post");
        else
           res.status(200).json(post);
    });
});

app.get('/Post',(req,res)=>{
    console.log("Getting all Post");
    User.find({}).populate("posts").exec((err,post)=>{
        if(err)
           res.status(400).send("There is an error while getting Post");
        else
           res.status(200).json(post);
    });
});

app.get('/User',(req,res)=>{
    User.findOne({}).populate('posts').exec((err, posts) => {
        if(err)
          res.status(400).send("Populated User " + posts);
        else
           res.status(200).json(posts);
          
      });
});

app.listen(port,()=>{
    console.log("App is running on port ",port);
});