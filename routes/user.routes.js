const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
require('dotenv').config()
const userRoutes = express.Router()

// sign up
userRoutes.post('/signup', async(req,res) => {
    try {
        const {email, password,confirmPassword} = req.body

        if(password !== confirmPassword)
        return res.status(400).json({message : 'Password do not match'})

        const hashed = await bcrypt.hash(password, 10)

        const newUser = new User({
            email,
            password:hashed,
        })

        await newUser.save()
        res.status(201).json({message : 'Signup Successful'})
    } catch (error) {
        res.status(500).json({message:'Internal server error'})
    }
})

// login
userRoutes.post('/login', async(req,res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user) 
        return res.status(401).json({message:'Invalid credentials'})

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) 
        return res.status(401).json({message:'Invalid credentials'})

        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET_KEY)
        
        res.status(200).json({message : 'Login Successful', token})
    } catch (error) {
        res.status(500).json({message:'Internal server error'})
    }
})

module.exports = userRoutes