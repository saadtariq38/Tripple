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
                        res.status(201).json({
                            _id: savedUserTraveller._id,
                            user: savedUser._id,
                            name: savedUserTraveller.name,
                            gender: savedUserTraveller.gender,
                            age: savedUserTraveller.age,
                            country: savedUserTraveller.country,
                            phone_number: savedUserTraveller.phone_number,
                            passport_number: savedUserTraveller.passport_number,
                            token: generateToken(savedUser._id, role_ID),
                        })
                        
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
                        res.status(201).json({
                            _id: savedUserAgent._id,
                            user: savedUser._id,
                            name: savedUserAgent.name,
                            description: savedUserAgent.description,
                            logo: savedUserAgent.logo,
                            address: savedUserAgent.address,
                            phone_number: savedUserAgent.phone_number,
                            token: generateToken(savedUser._id, role_ID)
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
    const { email, password, role_ID } = req.body

    //check for user email
    const user = await User.findOne({ email })
    const { _id } = user
    

    //user exists and passwords match condition
    if(user && (await bcrypt.compare(password, user.password))) {
        if(role_ID == 1) {   //condition for User_Traveller
            try {
                const user_traveller = await User_Traveller.findOne({ user: _id })
                
                res.json({
                    _id: user_traveller._id,
                    user: user_traveller.user,
                    name: user_traveller.name,
                    gender: user_traveller.gender,
                    age: user_traveller.age,
                    country: user_traveller.country,
                    phone_number: user_traveller.phone_number,
                    passport_number: user_traveller.passport_number,
                    token: generateToken( _id, role_ID ),
                })
            } catch (error) {
                console.log(error)
            }
        } else if (role_ID == 2) {  //condition for user_Agent
            try {
                const user_agent = await User_Agent.findOne({ user: _id })
                res.json({
                    _id: user_agent._id,
                    user: user_agent.user,
                    name: user_agent.name,
                    phone_number: user_agent.phone_number,
                    description: user_agent.description,
                    address: user_agent.address,
                    logo: user_agent.logo,
                    numOfActiveTrips: user_agent.numOfActiveTrips,
                    token: generateToken( _id, role_ID ),
                })  
            } catch (error) {
                console.log(error)
            }
        }
    } else {
        res.status(400)
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
    
            res.status(200).json({ id: req.params.id })
    
        } else if(role == 2) {
            const user_agent = await User_Agent.findOne({user: userExists._id})
            await user_agent.remove()
            await userExists.remove()
    
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
    
            res.status(200)
            res.json(updated_user_traveller)
    
        } else if (role_ID == 2) {
            const { name, description, logo, address, phone_number } = req.body
            const updated_user_agent = await User_Agent.findOneAndUpdate({user: userExists._id}, {
                name, description, logo, address, phone_number
            })
    
            res.status(200).json(updated_user_agent)
        }
    } else {
        res.status(401)
        throw new Error("not authorized to update this user")
    }


})

//Genereate Token

const generateToken = ( id, role_ID ) => {
    // payload = {
    //     "id": id,
    //     "role_ID": role_ID
    // }
    return jwt.sign({id , role_ID}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = {
  getMe,
  getAllUsers,
  registerUser,
  deleteUser,
  updateUser,
  loginUser,
  getAllAgents,
  getAllTravellers,
  
}