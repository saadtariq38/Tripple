const User = require('../models/userModel')
const User_Traveller = require('../models/user_travellerModel')
const User_Agent = require('../models/user_agentModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const asyncHandler = require('express-async-handler')

// @desc    Get user info
// @route   GET /api/user/me
// @access  Private
const getMe = asyncHandler(async(req, res) => {
    res.status(200).json({ message: "get user info"})
})

// @desc    Get all auser info
// @route   GET /api/user
// @access  Private
const getAllUsers = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'Get all user info'})
})

// @desc    Create new user account
// @route   POST /api/user/register
// @access  Public
const registerUser = asyncHandler(async(req, res) => {
    const { email, password, role_ID }  = req.body

    if(!role_ID) {
        res.status(400)
       // throw new Error("please add a role")
    }

    // if a traveller registers i.e role_ID = 1
    if (role_ID == 1) {
        const { name, gender, age, country, phone_number, passport_number } = req.body

        if(!name || !gender || !age || !country || !phone_number || !passport_number) {
            res.status(400)
          //  throw new Error("please add all fields")
        }

        //this indicates the same email cant be used to make an agent and traveller account
        const userExists = await User.findOne({email})
        
        if(userExists) {
            res.status(400)
           // throw new Error("User already exists")
        }

        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //Create User
        const user = await User.create({
            email,
            password: hashedPassword,
            role: role_ID
        }, (err, savedUser) => {
            if(err) {
                console.log(err)
            } else {
                User_Traveller.create({
                    user: savedUser._id,
                    name,
                    gender,
                    age,
                    country,
                    phone_number,
                    passport_number,
                }, (err, savedUserTraveller) => {
                    if(err) {
                        res.status(400)
                       // throw new Error("user traveller not created")
                    } else {
                        res.status(201).json(savedUserTraveller)
                        
                    }
                })
            }
        })

        // If an agent registers i.e role_ID = 2

    } else if (role_ID == 2) {
        const { name, description, logo, address, phone_number } = req.body

        if(!name || !description || !phone_number || !address) {
            res.status(400)
          //  throw new Error("please add all required fields")
        }

        //this indicates the same email cant be used to make an agent and traveller account
        const userExists = await User.findOne({email})
        
        if(userExists) {
            res.status(400)
           // throw new Error("User already exists")
        }

        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //Create User
        const user = await User.create({
            email,
            password: hashedPassword,
            role: role_ID
        }, (err, savedUser) => {
            if(err) {
                console.log(err)
            } else {
                User_Agent.create({
                    user: savedUser._id,
                    name,
                    description,
                    logo,
                    address, 
                    phone_number,
                }, (err, savedUserAgent) => {
                    if(err) {
                        console.log(err)
                    } else {
                        res.status(201).json(savedUserAgent)
                        
                    }
                })
            }
        })
    }
})

// @desc    Log into user account
// @route   POST /api/user/login
// @access  Public
const loginUser = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'login user account'})
})


// @desc    Delete user with id
// @route   DELETE /api/user/:id
// @access  Private
const deleteUser = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `user deleted with id:${req.params.id}`})
})

// @desc    Update user info with id
// @route   PUT /api/user/:id
// @access  Private
const updateUser = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `user info updated with id:${req.params.id}`})
})


module.exports = {
  getMe,
  getAllUsers,
  registerUser,
  deleteUser,
  updateUser,
  loginUser,
}