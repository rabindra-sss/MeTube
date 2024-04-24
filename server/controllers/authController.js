import mongoose from 'mongoose'
import userModel from '../model/userModel.js';
import bcrypt from 'bcryptjs'
import { createError } from '../error.js';
import jwt from 'jsonwebtoken'
export const signup = async (req,res,next)=>{
    
    try 
    {const {userName,userId,email,password}= req.body;
    //validation
    if(!userName||!userId||!email||!password) {
        next("provide all")
    }
    
    const user= userModel(req.body);

    await user.save();

    res.status(200).send({
        success: true,
        message: 'user created successfully',
        user:{
            userName: user.userName,
            userId: user.userId,
            email: user.email
        }
    })}
    catch(err) {
        //console.log('error in signup controller')
        //console.log(err)
        next(err)
    }
}
// log in
export const signin= async (req,res,next)=>{
    
    try
    {
    const {email}= req.body;
    const {userId}= req.body;
    //validation
    // if(!email||!req.body.password) {
    //     next("provide all")
    // }
    // logic
    
    // email or userId
    //console.log(1)

    const cookie= req.cookies.access_token;
    //console.log(cookie)

    const user= await userModel.findOne({$or: [{email: email}, {userId:userId}]});
    if(!user) {return next(createError(404,"user not found"))}
    
    const ismatch= await user.comparepassword(req.body.password);
    //console.log(ismatch)
    if(!ismatch) {return next(createError(400, "wrong credentials"))}
    
    const token= jwt.sign({id: user._id}, process.env.JWT_KEY);
    
    const {password, ...others}= user._doc;
    
    res.cookie("access_token", token, {httpOnly: true}).status(200).send({
        success: true,
        message: 'logged in successfully',
        user: others
    })
    }

    catch(err){
        throw(err);
        // const error= createError(404,"could not found user");
        // next(error);
    }
}

export const googleSignin= async (req,res,next)=>{
    try{
        
    const user = await userModel.findOne({email: req.body.email});

    if(user) {
        //console.log('google signed in')
        const token= jwt.sign({id: user._id}, process.env.JWT_KEY);   
        res.cookie("access_token", token, {httpOnly: true}).status(200).send({
            success: true,
            message: 'logged in successfully',
            user: user._doc
        }) 
    }

    else {
        let i =3;
        let savedUser= null;
        //create unique userId
        while(i>0){
            req.body.userId = req.body.userName + createRandomString(i)
            //console.log(req.body.userId)
            
            savedUser= await userModel.create({...req.body, fromGoogle: true})
            if(savedUser) break;
            i=i+1;
            //console.log(i)
        }
        
        const token= jwt.sign({id: savedUser._id}, process.env.JWT_KEY);   
        res.cookie("access_token", token, {httpOnly: true}).status(200).send({
            success: true,
            message: 'logged in successfully',
            user: savedUser._doc
        }) 

    }
    }
    catch(err){
        throw(err)
    }
}

function createRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  