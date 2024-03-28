const express= require('express');
const routes=express.Router();


const userControlller=require('../controllers/user');
const userAuthenticate=require('../middleware/authentication')
const Userchat=require('../controllers/chat_app')

routes.post('/signup',userControlller.postSignup);
routes.post('/login',userControlller.postLogin);







module.exports=routes;