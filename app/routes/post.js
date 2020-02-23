const express = require('express');
const router = new express.Router();
const Post = require('./../models/post');
const Comment = require('./../models/comment');

const routeGuard = require('./../middleware/route-guard');



//CREATE A POST - WITH GET:
router.get('/create', routeGuard(true),(req,res,next) => {
  //...
  res.render('post/create');
});

//SHOW 

router.get('/:id',(req,res,next) => {
  //...
  const { id } = req.params;
  let post;

  Post.findById(id)
    .populate('author')
    .then((document) => {
      post = document;
      if(!document){
        return Promise.reject(new Error('NOT_FOUND'));
      }else{
        return Comment.find({ post: id }).populate('author');
      }
    })
    .then(comments => {
      res.render('post/single', { post, comments });
    })
    .catch((error)=>{
      next(error);
    });
  
});




router.post('/:id/comment',routeGuard(true),(req,res,next)=>{
  const { id } = req.params;
  const { title, description } = req.body;

  Post.findById(id)
  .then(post => {
    if(!post){
      return Promise.reject(new Error('NOT_FOUND'));
    }else {
      return Comment.create({
        author: req.user._id,
        post: id,
        description,
        title
      });
    }
  })
  .then(() => {
    res.redirect(`/post/${id}`);
  })
  .catch(error => {
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



//CREATE A POST - WITH POST:
router.post(
  '/create', 
  routeGuard(true),
  uploader.single('picture'),
  (req,res,next) => {
  //...
    const { title, description } = req.body;
    const { url } = req.file;
    const author = req.user._id;


  Post.create({
    title,
    description,
    picture:url,
    author
  })
  .then( post => {
    res.redirect(`/post/${post._id}`);
  })
  .catch((error) =>{
    next(error);
  });
});

module.exports = router;