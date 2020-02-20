const express = require('express');
const router = new express.Router();


router.get('/edit',(req,res,next) => {
  //...
  res.render('profile/edit');
});

router.post('/edit',(req,res,next) => {
  res.redirect('/private');
})



module.exports = router;