const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes/User.route");
const jwt = require("jsonwebtoken");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const multer = require("multer");
const fs = require("fs");
const Post = require("./models/Post");
const path = require("path");

const uploadMiddleware = multer({ dest: "uploads/" });

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use('/uploads', express.static(__dirname + "/uploads"));
app.use(express.static(path.resolve(__dirname, '../user/build')));

const secret = process.env.JWT_SECRET;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/", router);

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, decoded) => {
    if (err) throw err;
    res.json(decoded);
  });
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  try{
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  jwt.verify(req.cookies.token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const post = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(post);
  });
}
catch(err){
  console.log(err);
}
})


app.put('/post/:id', uploadMiddleware.single("file"), async (req, res) => {

  let newPath = null;
  if(req.file){
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length-1];
    newPath = path + '.' + ext;
    fs.renameSync(path,newPath);
  }
    jwt.verify(req.cookies.token,secret,{},async(err,info)=>{
      if(err) throw err;
      const {id} = req.params.id;
      const {title,summary,content,file} = req.body;
      const postDoc = await Post.findById(req.params.id);
      console.log(postDoc.author);
      console.log(JSON.stringify(postDoc.author));
      console.log(info.id);
      const isAuthor = JSON.stringify(postDoc.author) == JSON.stringify(info.id);
      if(!isAuthor){
        return res.status(401).json({error:'Unauthorized'});
  }
  try {
    const post = await Post.findByIdAndUpdate(id, { $set: {
      title,
      summary,
      content,
      file: req.file.path }}, { new: true });
    // ...
  } catch (error) {
    console.error(error);
  }
          
        }
      )
    })

app.get("/post", async (req, res) => {
  try {
  res
    .json(
      await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
    )
  }
  catch(err){
    console.log(err);
  }
});

app.get('/post/:id', async(req,res) =>{
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author',['username']);
  res.json(postDoc)
})

app.delete('/post/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Error deleting post' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(4000, () => {
  console.log(`Server running at http://localhost:4000`);
});
