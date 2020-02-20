const express = require('express');
const router = new express.Router();


router.get('/create',(req,res,next) => {
  //...
  res.render('post/create');
});

router.get('/:id',(req,res,next) => {
  //...
  const { id } = req.params;

  Post.findById(id)
    .then((post) => {
      res.render('post/single', {post});
    })
    .catch((error)=>{
      next(error);
    });
  
});

const Comment = require('./../models/comment');

router.post('/:id',(req,res,next)=>{
  const { id } = req.params;
  const { title, description } = req.body;

  Comment.create({
    title,
    description,
    idPost:id
  })
  .then(comment => {
    Comment.findOne(comment.idPost)
  })
  .then((comment) =>{
    res.render(`post/single`,{comment});
  })
  .catch((error) =>{
    next(error);
  });

});


//POST METHOD TO CREATE A POST

const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multerStorageCloudinary({
  cloudinary,
  folder: 'posts-images',
  allowFormats: ['jpg','png']
});

const uploader = multer({ storage });
const Post = require('./../models/post');


router.post('/create', uploader.single('picture'),(req,res,next) => {
  //...

  const { title, description } = req.body;
  const { url } = req.file;

  Post.create({
    title,
    description,
    picture:url
  })
  .then( post => {
    res.redirect(`/post/${post._id}`);
  })
  .catch((error) =>{
    next(error);
  });
});

module.exports = router;