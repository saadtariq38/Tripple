const User = require('../models/userModel')
const User_Traveller = require('../models/user_travellerModel')
const User_Agent = require('../models/user_agentModel')
const User_Event = require("../models/userEventsModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { generateAccessToken, generateRefreshToken } = require('../helper/tokenHelpers')
// const tokenList = {
//     refreshToken: "",
//     accessToken: "",
// }


const asyncHandler = require('express-async-handler')

// @desc    Get agent user info
// @route   POST /api/user/token
// @access  Public
const getOneAgentUser = asyncHandler( async (req, res) => {
    const agentData = await User_Agent.findById(req.params.id, 'user')
    console.log(agentData)
    if(!agentData) {
        res.status(500)
        throw new Error("could not get agent data")
    }

    res.status(200).json(agentData)

})

// @desc    Get user info
// @route   POST /api/user/token
// @access  Public
const expiredToken = asyncHandler(async(req,res) => {
    const { refreshToken } = req.body
    const refreshDecoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    const { id, role } = refreshDecoded

    const newAccessToken = generateAccessToken(id, role)
    console.log("new access token created")

    res.status(200).json(newAccessToken)
    
})

// @desc    Get user info
// @route   GET /api/user/me
// @access  Private
const getMe = asyncHandler(async(req, res) => {
    const { _id, email, role } = req.user
    let moreInfo
    if(role == 1) {
        moreInfo = await User_Traveller.find({user: _id})
    } else if (role == 2) {
        moreInfo = await User_Agent.find({user: _id})
    }

    res.status(200).json({
        id: _id,
        email,
        role: role,
        moreInfo
    })
})

// @desc    Get all user info
// @route   GET /api/user
// @access  Public
const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
})

// @desc    Get all user traveller info
// @route   GET /api/user/traveller
// @access  Public
const getAllTravellers = asyncHandler(async(req, res) => {
    const travellers = await User_Traveller.find({})
    res.status(200).json(travellers)
})

// @desc    Get all user agent info
// @route   GET /api/user/agent
// @access  Public
const getAllAgents = asyncHandler(async(req, res) => {
    const agents = await User_Agent.find({})
    res.status(200).json(agents)
})

// @desc    Create new user account
// @route   POST /api/user/register
// @access  Public
const registerUser = asyncHandler(async(req, res) => {
    const { email, password, role }  = req.body

    if(!role) {
        res.status(400)
        throw new Error("please add a role")
    }

    // if a traveller registers i.e role = 1
    if (role == 1) {
        const { name, gender, age, country, phone_number, passport_number } = req.body

        if(!name || !gender || !age || !country || !phone_number || !passport_number) {
            res.status(400)
            throw new Error("please add all fields")
        }

        //this indicates the same email cant be used to make an agent and traveller account
        const userExists = await User.findOne({email})
        
        if(userExists) {
            res.status(400)
            throw new Error("User already exists")
        }

        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //Create User
        const user = await User.create({
            email,
            password: hashedPassword,
            role: role
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
                        throw new Error("user traveller not created")
                    } else {
                        const accToken = generateAccessToken(savedUser._id, role)
                        const refToken = generateRefreshToken(savedUser._id, role)
                        // localStorage.setItem('accessToken', accToken)
                        // localStorage.setItem('refreshToken', refToken)


                        User_Event.create({
                            user: savedUser._id,
                            eventType: 1,
                        }, (err, savedUserEvent) => {
                            if(err) {
                                res.status(400)
                                throw new Error("Could not create a register event")
                            }
                        })
                        res.status(201).json({
                            accessToken: accToken,
                            refreshToken: refToken,
                        })
                        
                    }
                })
            }
        })

        // If an agent registers i.e role = 2

    } else if (role == 2) {
        const { name, description, logo, address, phone_number } = req.body

        if(!name || !description || !phone_number || !address) {
            res.status(400)
            throw new Error("please add all required fields")
        }

        //this indicates the same email cant be used to make an agent and traveller account
        const userExists = await User.findOne({email})
        
        if(userExists) {
            res.status(400)
            throw new Error("User already exists")
        }

        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //Create User
        const user = await User.create({
            email,
            password: hashedPassword,
            role: role
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
                        const accToken = generateAccessToken(savedUser._id, role)
                        const refToken = generateRefreshToken(savedUser._id, role)
                        // localStorage.setItem('accessToken', accToken)
                        // localStorage.setItem('refreshToken', refToken)

                        User_Event.create({
                            user: savedUser._id,
                            eventType: 1,
                        }, (err, savedUserEvent) => {
                            if(err) {
                                res.status(400)
                                throw new Error("Could not create a register event")
                            }
                        })

                        res.status(201).json({
                            
                            accessToken: accToken,
                            refreshToken: refToken,
                        })
                        
                        
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
    const { email, password, role } = req.body

    let user

    //check for user email
    
        user = await User.findOne({ email })
        if (!user){
            res.status(404)
            throw new Error("User not found")
        }

        
    
    
    const { _id } = user
    

    //user exists and passwords match condition
    if(user && (await bcrypt.compare(password, user.password)) && user.role == role) {
        if(role == 1) {   //condition for User_Traveller
            try {
                const user_traveller = await User_Traveller.findOne({ user: _id })
                const accToken = generateAccessToken( _id, role )
                const refToken = generateRefreshToken( _id, role )
                // localStorage.setItem('accessToken', accToken)
                // localStorage.setItem('refreshToken', refToken)
                console.log("weeee")

                User_Event.create({
                    user: _id,
                    eventType: 2,
                }, (err, savedUserEvent) => {
                    if(err) {
                        res.status(400)
                        throw new Error("Could not create a login event")
                    }
                })

                res.json({
                   
                    accessToken: accToken,
                    refreshToken: refToken,

                })
            } catch (error) {
                throw new Error("Login failed for traveller")
            }
        } else if (role== 2) {  //condition for user_Agent
            try {
                const user_agent = await User_Agent.findOne({ user: _id })
                const accToken = generateAccessToken( _id, role )
                const refToken = generateRefreshToken( _id, role)
                // localStorage.setItem('accessToken', accToken)
                // localStorage.setItem('refreshToken', refToken)
                console.log("here")

                User_Event.create({
                    user: _id,
                    eventType: 2,
                }, (err, savedUserEvent) => {
                    if(err) {
                        res.status(400)
                        throw new Error("Could not create a login event")
                    }
                })

                res.json({
                   
                    accessToken: accToken,
                    refreshToken: refToken,
                })  
            } catch (error) {
                throw new Error("Login Failed for agent")
            }
        }
    } else {
        res.status(401)
        throw new Error("Invalid user data")
    }

})


// @desc    Delete user with id
// @route   DELETE /api/user/:id
// @access  Private
const deleteUser = asyncHandler(async(req, res) => {
    const { _id, role } = req.user
    const userExists = await User.findOne({ _id: req.params.id })

    if(req.params.id == _id) {
        if(role == 1) {
            const user_traveller = await User_Traveller.findOne({user: userExists._id})
            await user_traveller.remove()
            await userExists.remove()

            User_Event.create({
                user: _id,
                eventType: 3,
            }, (err, savedUserEvent) => {
                if(err) {
                    res.status(400)
                    throw new Error("Could not create a delete user event")
                }
            })
    
            res.status(200).json({ id: req.params.id })
    
        } else if(role == 2) {
            const user_agent = await User_Agent.findOne({user: userExists._id})
            await user_agent.remove()
            await userExists.remove()

            User_Event.create({
                user: _id,
                eventType: 3,
            }, (err, savedUserEvent) => {
                if(err) {
                    res.status(400)
                    throw new Error("Could not create a delete user event")
                }
            })
    
            res.status(200).json({ id: req.params.id })
        }
    } else {
        res.status(401)
        throw new Error("not authorized to delete this user")
    }

})

// @desc    Update user info with id
// @route   PUT /api/user/:id
// @access  Private
const updateUser = asyncHandler(async(req, res) => {
   
    const { _id, role }  = req.user
    const userExists = await User.findOne({ _id: req.params.id })
    if(req.params.id == _id) {
        if(role == 1) {
            const { name, gender, age, country, phone_number, passport_number } = req.body
            
    
            const updated_user_traveller = await User_Traveller.findOneAndUpdate({user: userExists._id}, {
                name, gender, age, country, phone_number, passport_number
            })

            User_Event.create({
                user: _id,
                eventType: 4,
                additionalInfo: updated_user_traveller,
            }, (err, savedUserEvent) => {
                if(err) {
                    res.status(400)
                    throw new Error("Could not create a delete user event")
                }
            })
    
            res.status(200).json(updated_user_traveller)
            
    
        } else if (role == 2) {
            const { name, description, logo, address, phone_number } = req.body
            const updated_user_agent = await User_Agent.findOneAndUpdate({user: userExists._id}, {
                name, description, logo, address, phone_number
            })

            User_Event.create({
                user: _id,
                eventType: 4,
                additionalInfo: updated_user_agent,
            }, (err, savedUserEvent) => {
                if(err) {
                    res.status(400)
                    throw new Error("Could not create a delete user event")
                }
            })
    
            res.status(200).json(updated_user_agent)
        }
    } else {
        res.status(401)
        throw new Error("not authorized to update this user")
    }


})







module.exports = {
  getMe,
  getAllUsers,
  registerUser,
  deleteUser,
  updateUser,
  loginUser,
  getAllAgents,
  getAllTravellers,
  expiredToken,
  getOneAgentUser,
  
}