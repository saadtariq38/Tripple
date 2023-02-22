const Trip = require('../models/tripModel')
const User_Agent = require('../models/user_agentModel')

const asyncHandler = require('express-async-handler')


// @desc    Get all trips or filter by category and type according to body data
// @route   GET /api/trips
// @access  Public
const getTrips = asyncHandler(async(req, res) => {
    let trip = new Array();
    if (!req.body.tripCategory && !req.body.tripType) {
       trip = await Trip.find({})
    }
    if (req.body.tripCategory) {
        let { tripCategory } = req.body
        tripCategory = tripCategory.toLowerCase(); 
        if(tripCategory === "educational") {
            trip.push(await Trip.find({tripCategory: tripCategory}))
        } else if (tripCategory === "recreational") {
            trip.push(await Trip.find({tripCategory: tripCategory}))
        }
        else if(tripCategory === "entertainment"){
            trip.push(await Trip.find({tripCategory: tripCategory}))
        }
       else{
           res.status(400)
           throw new Error ('No relevant trips found according to category')
       }   
   }
   if (req.body.tripType) {
    let { tripType } = req.body
    tripType = tripType.toLowerCase(); 
    if(tripType === "local") {
        trip.push(await Trip.find({tripType: tripType}))
        } else if (tripType === "international") {
        trip.push(await Trip.find({tripType: tripType}))
    }
    else{
        res.status(400)
        throw new Error ('No relevant trips found according to type')
    } 
   } 
//    else {
//     res.status(400)
//     throw new Error("could not find trips")
//    }
const unique = [...new Map(trip.map((m) => [trip.name, m])).values()];

    res.status(200).json({
        unique
    })
})


// const getTrips = asyncHandler( async(req, res) => {
//     try {
//         const trips = await Trip.find({})
//         res.status(200).json(trips)
//     } catch (error) {
//         res.status(404)
//         throw new Error("Fetching trips failed")
//     }
// })

// @desc    Get user trips
// @route   GET /api/trips/userTrips
// @access  Private
const getUsertrips = asyncHandler(async (req, res) => {
   const { _id, email, role } = req.user;

   try {
       if(role == 1) {
           const userTrips = await Trip.find({'registeredUsers.user' : _id})
           res.status(200).json(userTrips)
       } else if(role == 2) {
            const user_agent = await User_Agent.find({user: _id})
            const agent_trips = await Trip.find({agent: user_agent._id})
            res.status(200).json(agent_trips)
       }
   } catch (error) {
    res.status(400)
    throw new Error("Failed to get user trips")
   }


})


// @desc    Get one trip through id
// @route   GET /api/trips/:id
// @access  Public
const getOneTrip = asyncHandler( async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id)
        res.status(200).json(trip)
    } catch (error) {
        res.status(404)
        throw new Error('Trip not found')
    }
})




// @desc    Create new trip
// @route   POST /api/trips
// @access  Private
const setTrip = asyncHandler( async (req, res) => {
    const { _id, role } = req.user
    if(role == 1) {
        res.status(401)
        throw new Error('Only an agent can create trips')
    } else if(role ==2) {
        

        //get agent info from the id we got from auth token
      //  const agentInfo = await User_Agent.find({user: _id})
        const { name, description, duration, images, tripCategory, tripType, cost, availableSeats, startingLocation, destination, itinerary } = req.body

        //check for all required fields
        if(!name || !description || !duration || !tripCategory || !tripType || !cost || !availableSeats || !startingLocation || !destination || !itinerary) {
            res.status(400)
            throw new Error("please add all fields")
        }

            

            //create trip
        
        await Trip.create({
            agent: _id,
            name,
            description,
            duration,
            images,
            tripCategory,
            tripType,
            cost,
            status: "available",
            availableSeats: 0,
            rating: 0,
            numOfRatings: 0,
            startingLocation,
            destination,
            itinerary
        }, function (err, newTrip) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(newTrip)
            }
        });


           

       
        
    }
   
})

// @desc    Delete trip with id
// @route   DELETE /api/trips/:id
// @access  Private
const deleteTrip = (req, res) => {
    res.status(200).json({ message: `trip deleted with id:${req.params.id}`})
}

// @desc    Update trip with id
// @route   PUT /api/trips/:id
// @access  Private
const updateTrip = (req, res) => {
    res.status(200).json({ message: `trip updated with id:${req.params.id}`})
}


module.exports = {
    getTrips,
    setTrip,
    deleteTrip,
    updateTrip,
    getUsertrips,
    getOneTrip,
}