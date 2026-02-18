const express=require("express");
const bcrypt=require("bcryptjs");
const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken");
const cookie=require("cookie-parser");

async function registerUser(req,res){
    const {username,email,password,role}=req.body;
    const isUserAlreadyExist=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"Username or Email already exists"
        })
    }

    const hash=await bcrypt.hash(password,10);

    const user=await userModel.create({
        username,
        email,
        password:hash,
        role
    })

    const token=jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET_KEY,{expiresIn:"1h"});

    res.cookie("token",token);

    res.status(201).json({
        message:"User registered successfully"
    })
}

async function loginUser(req,res){
    
    const {username,email,password}=req.body;

    const user= await userModel.findOne({
        $or:[
            {username},{email}
        ]
    })

    if(!user){
        return res.status(401).json({
            message:"User doesn't exist"
        })
    }

    const isPasswordValid=await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(409).json({
            message:"Incorrect password"
        }) 
    }

    const token=jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET_KEY,{expiresIn:"30m"})

    res.cookie("token",token);

    res.status(200).json({
        message:"Login Successful",
        user
    })

}

async function logoutUser(res,res){

    res.clearCookie("token");
    return res.status(200).json({
        message:"User logged out successfully"
    })
}

module.exports={registerUser,loginUser,logoutUser};