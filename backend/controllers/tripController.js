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
            availableSeats,
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
const deleteTrip = asyncHandler( async (req, res) => {
    const { _id, role } = req.user
    if(role == 1) {
        res.status(401)
        throw new Error("User not authorized to delete trip")
    }

   
    const tripToDelete = await Trip.findById(req.params.id)
    
    if (tripToDelete.agent.equals(_id)) {       //NOTE .equals ONLY WORKING WHEN THE OBJECT IS OBTAINED THROUGH FindById  *******
        await tripToDelete.remove()
        res.status(200).json({_id : req.params.id})
        
    } else {
        res.status(401)
        throw new Error("Sorry, only authorized to delete your own trips")
    }

   
    


})

// @desc    Update trip with id
// @route   PUT /api/trips/:id
// @access  Private
const updateTrip = asyncHandler(async (req, res) => {
    const { _id, role } = req.user
    if(role == 1) {    //if user is a traveller they cannot update a trip
        res.status(401)
        throw new Error("User not authorized to update trip")
    }

    const tripToUpdate = await Trip.findById(req.params.id) //find the trip to be updated using params
    

    if(tripToUpdate.agent.equals(_id)) {    //if the trip in params matches the logged in agent user
        const { name, description, duration, images, tripCategory, tripType, status, availableSeats, startingLocation, destination, itinerary } = req.body 

        const updatedTrip = await Trip.findOneAndUpdate({_id : req.params.id}, {    //update trip with the body
            name, description, duration, images, tripCategory, tripType, status, availableSeats, startingLocation, destination, itinerary
        })

        res.status(200).json(updatedTrip)
    } else {
        res.status(401)
        throw new Error("Cannot update trips that were not created by the logged in agent")
    }


})


module.exports = {
    getTrips,
    setTrip,
    deleteTrip,
    updateTrip,
    getUsertrips,
    getOneTrip,
}