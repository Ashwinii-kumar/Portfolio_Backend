const express=require('express');
const router=express.Router();

const {mailController}=require('../controllers/mailController');


router.post('/submit',mailController);


module.exports=router;