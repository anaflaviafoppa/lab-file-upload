const express = require('express');
const router = new express.Router();

const User = require('./../models/user');


router.get('edit/:id',(req,res,next) => {
  console.log('acess');

  res.render('profile/edit');
 /* const { id } = req.params;

  User.findById(id)
    .then((user) => {
      res.render('profile/edit', {user});
    })
    .catch((error)=>{
      next(error);
    });*/
});

/*
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
  folder: 'profile',
  allowFormats: ['jpg','png']
});

const uploader = multer({ storage });
//const Place = require('./../models/profile');

router.post('/edit',(req,res,next) => {
  res.redirect('/private');
});*/



module.exports = router;