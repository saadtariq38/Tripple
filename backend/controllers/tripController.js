const Trip = require('../models/tripModel')
const User_Agent = require('../models/user_agentModel')
const Trip_Event = require("../models/tripEventsModel")

const asyncHandler = require('express-async-handler')
const { rawListeners } = require('../models/userModel')


// @desc    Get all trips or filter by category and type according to body data
// @route   GET /api/trips
// @access  Public
const getTrips = asyncHandler(async (req, res) => {
    let trips;
    const tripCategory = req.query.tripCategory?.toLowerCase();
    const tripType = req.query.tripType?.toLowerCase();
  
    if (!tripCategory && !tripType) {
      trips = await Trip.find({ status: { $ne: "cancelled" } });
    } else if (tripType && tripCategory) {
      trips = await Trip.find({
        tripCategory: tripCategory,
        tripType: tripType,
        status: { $ne: "cancelled" },
      });
    } else if (tripCategory) {
      trips = await Trip.find({
        tripCategory: tripCategory,
        status: { $ne: "cancelled" },
      });
    } else if (tripType) {
      trips = await Trip.find({
        tripType: tripType,
        status: { $ne: "cancelled" },
      });
    } else {
      res.status(400);
      throw new Error("Could not find trips for the specified query parameters");
    }
  
    res.status(200).json(trips);
  });
  
// const getTrips = asyncHandler(async(req, res) => {
//     var trips;
//     if (!req.body.tripCategory && !req.body.tripType) {
//        trips = await Trip.find({ status: { $ne: "cancelled" }});
//     }
//     else if (req.body.tripType && req.body.tripCategory) {
//         let { tripType, tripCategory } = req.body
//         tripType = tripType.toLowerCase();
//         tripCategory = tripCategory.toLowerCase();
//         trips = await Trip.find({tripCategory: tripCategory, tripType: tripType, status: { $ne: "cancelled" }});
//     } 
//     else if (req.body.tripCategory) {
//         let { tripCategory } = req.body
//         tripCategory = tripCategory.toLowerCase(); 
//         trips = await Trip.find({tripCategory: tripCategory, status: { $ne: "cancelled" } })   
//     }
//     else if (req.body.tripType) {
//         let { tripType } = req.body
//         tripType = tripType.toLowerCase();
//         trips = await Trip.find({tripType: tripType, status: { $ne: "cancelled" } })
//     }
//     else {
//         res.status(400)
//         throw new Error("Could not find trips for the specified body")
//     }
    


//     res.status(200).json(trips)
// })


// @desc    Get user trips
// @route   GET /api/trips/userTrips
// @access  Private
const getUsertrips = asyncHandler(async (req, res) => {
   const { _id, role } = req.user;

   try {
       if(role == 1) {
        const userTrips = await Trip.find({ registeredUsers: _id });
           res.status(200).json(userTrips)
       } else if(role == 2) {
          //  const user_agent = await User_Agent.find({user: _id})
            const agent_trips = await Trip.find({agent: _id})
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
        const trip = await Trip.findById(req.params.id).select('-registeredUsers');
        res.status(200).json(trip);
    } catch (error) {
        res.status(404)
        throw new Error('Trip not found')
    }
})


// @desc    Get one trip through id beloning to logged in agent
// @route   GET /api/trips/agent/:id
// @access  Private
const getOneAgentTrip = asyncHandler(async (req, res) => {
    const { _id, role } = req.user
    if (role == 1) {
        res.status(403)
        throw new Error("Only agents can access complete trip info")
    }

    const trip = await Trip.findById(req.params.id)
    if (trip) {
        if (trip.agent.equals(_id)) {
            res.status(200).json(trip)
        } else {
            res.status(404)
            throw new Error("Not authorized to access other agent's trip info")
        }
    } else {
        res.status(404)
        throw new Error("Trip not found")
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
                Trip_Event.create({
                    user: _id,
                    trip: newTrip._id,
                    eventType: 5,
                }, (err, savedTripEvent) => {
                    if(err) {
                        res.status(400)
                        throw new Error("Could not create a set trip event")
                    }
                })
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
    if(role == 1 || role == 2) {
        res.status(401)
        throw new Error("User not authorized to delete trip")
    }

   
    const tripToDelete = await Trip.findById(req.params.id)
    
    await tripToDelete.remove()

    Trip_Event.create({
        user: _id,
        trip: tripToDelete._id,
        eventType: 7,
    }, (err, savedTripEvent) => {
        if(err) {
            res.status(400)
            throw new Error("Could not create a delete trip event")
        }
    })
    res.status(200).json({_id : req.params.id})
    // if (tripToDelete.agent.equals(_id)) {       //NOTE .equals ONLY WORKING WHEN THE OBJECT IS OBTAINED THROUGH FindById  *******
        
    // } else {
    //     res.status(401)
    //     throw new Error("Sorry, only authorized to delete your own trips")
    // }

   
    


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
        const { name, description, duration, images, tripCategory, tripType, cost, status, availableSeats, startingLocation, destination, itinerary } = req.body 

        const updatedTrip = await Trip.findOneAndUpdate({_id : req.params.id}, {    //update trip with the body
            name, description, duration, images, tripCategory, tripType, cost, status, availableSeats, startingLocation, destination, itinerary
        })

        Trip_Event.create({
            user: _id,
            trip: tripToUpdate._id,
            eventType: 6,
            additionalInfo: updatedTrip
        }, (err, savedTripEvent) => {
            if(err) {
                res.status(400)
                throw new Error("Could not create an update trip event")
            }
        })
        res.status(200).json(updatedTrip)
    } else {
        res.status(401)
        throw new Error("Cannot update trips that were not created by the logged in agent")
    }


})

// @desc    Sort trips according to value passed in body
// @route   POST /api/trips/sortedTrips
// @access  Public
const sortTrips = asyncHandler(async (req, res) => {

    const { sortBy, sortOrder, trips } = req.body

    
    const sortedTrips = trips

    try {
    
        // Sort by cost
        if (sortBy === 'cost') {
            sortedTrips.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.cost - b.cost;        //built-in javascript sort function return 1
                } else if (sortOrder === 'desc') {
                    return b.cost - a.cost;
                }
            });
        }
    
        // Sort by duration
        if (sortBy === 'duration') {
            sortedTrips.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.duration - b.duration;
                } else if (sortOrder === 'desc') {
                    return b.duration - a.duration;
                }
            });
        }   
    } catch (error) {
        res.status(400)
        throw new Error("Unable to sort trips")
    }

    res.status(200).json(sortedTrips)


})

// @desc    Cancel trip with id
// @route   PUT /api/trips/cancel/:id
// @access  Private
const cancelTrip = asyncHandler( async (req, res) => {
    const { _id, role } = req.user
    if(role == 1) {    //if user is a traveller they cannot cancel a trip
        res.status(401)
        throw new Error("User not authorized to cancel trip")
    }

    const tripToCancel = await Trip.findById(req.params.id)
    
    if(tripToCancel.agent.equals(_id)) {
        const cancelledTrip = await Trip.findOneAndUpdate({_id : req.params.id}, {status : "cancelled"})
    } else {
        throw new Error("Only allowed to cancel your own trips")
    }

    Trip_Event.create({
        user: _id,
        trip: tripToCancel._id,
        eventType: 8,
    }, (err, savedTripEvent) => {
        if(err) {
            res.status(400)
            throw new Error("Could not create a cancel trip event")
        }
    })
    res.status(200).json({_id : req.params.id})

})

// @desc    Register for trip with id
// @route   POST /api/trips/register/:id
// @access  Private
const registerForTrip = asyncHandler( async (req, res) => {
    const { _id, role } = req.user
    if(role == 2) {    //if user is an agent they cannot register for a trip
        res.status(401)
        throw new Error("User not authorized to register for a trip")
    }


    const tripToRegister = await Trip.findById(req.params.id)
    const openSeats = tripToRegister.availableSeats


    const isUserRegistered = tripToRegister.registeredUsers.some((userIdInArray) => userIdInArray.equals(_id))
    if(isUserRegistered) {
        res.status(400)
        throw new Error("User already registered for this trip")
    }

    if(tripToRegister.status == "full"){
        res.status(400)
        throw new Error("No open seats available")
    }

    if(tripToRegister.status == "cancelled"){
        res.status(400)
        throw new Error("This trip has been cancelled by the agent. Registration unsuccessful.")
    }

    if (openSeats == 1) {
        
        tripToRegister.registeredUsers.push(_id)
        tripToRegister.save()
        const updatedTrip = await Trip.findOneAndUpdate({_id: req.params.id},{ $set: { availableSeats: 0, status: "full" } },)

        Trip_Event.create({
            user: _id,
            trip: tripToRegister._id,
            eventType: 9,
        }, (err, savedTripEvent) => {
            if (err) {
                res.status(400)
                throw new Error("Could not create a regsiter for trip event")
            }
        })

        res.status(200).json({ _id: tripToRegister._id })
    } else {
        
        tripToRegister.registeredUsers.push(_id)    //need .save() for this since it isnt a mongo db func
        await tripToRegister.save()
        const updatedTrip = await Trip.findOneAndUpdate({_id: req.params.id},{availableSeats: (openSeats-1)})

        Trip_Event.create({
            user: _id,
            trip: tripToRegister._id,
            eventType: 9,
        }, (err, savedTripEvent) => {
            if (err) {
                res.status(400)
                throw new Error("Could not create a register for trip event")
            }
        })
        
        res.status(200).json({ _id: tripToRegister._id })
    }

})

// @desc    Unregister for trip with id
// @route   PUT /api/trips/unregister/:id
// @access  Private

const unregisterForTrip = asyncHandler( async (req, res) => {

    const { _id, role } = req.user
    if(role == 2) {    //if user is an agent they cannot unregister for a trip
        res.status(401)
        throw new Error("User not authorized to unregister for trip")
    }

    const tripToUnregister = await Trip.findById(req.params.id)
    const openSeats = tripToUnregister.availableSeats
    if(!tripToUnregister) {
        res.status(404)
        throw new Error("trip does not exist")
    }

    if(tripToUnregister.status == "ongoing" || tripToUnregister.status == "completed" || tripToUnregister.status == "cancelled") {
        res.status(400)
        throw new Error("Not allowed to unregister from the trip at this point")
    }
    

    if (tripToUnregister.availableSeats == 0) {

        const updatedTrip = await Trip.findOneAndUpdate({_id: req.params.id },{ $pull: { registeredUsers: _id }, $set: { status: "available", availableSeats: (openSeats+1) } } )

        Trip_Event.create({
            user: _id,
            trip: tripToUnregister._id,
            eventType: 10,
        }, (err, savedTripEvent) => {
            if (err) {
                res.status(400)
                throw new Error("Could not create an unregister for trip event")
            }
        })
        res.status(200).json({ _id: tripToUnregister._id })
        
    } else {
        const updatedTrip = await Trip.findOneAndUpdate({_id: req.params.id },{ $pull: { registeredUsers: _id }, $set: { availableSeats: (openSeats+1)} } )
        Trip_Event.create({
            user: _id,
            trip: tripToUnregister._id,
            eventType: 10,
        }, (err, savedTripEvent) => {
            if (err) {
                res.status(400)
                throw new Error("Could not create an unregister for trip event")
            }
        })
        res.status(200).json({ _id: tripToUnregister._id })
    }

    

    
})

// @desc    add a review with rating and comment for a trip
// @route   POST /api/trips/review/:id
// @access  Private


const addTripReview = asyncHandler(async (req,res) => {
    const { _id, role } = req.user
    if(role == 2) {    //if user is an agent they cannot add a trip review
        res.status(401)
        throw new Error("User not authorized to review a trip")
    }

    const { rating, comment } = req.body
    if(!rating) {
        res.status(400)
        throw new Error("Cannot review without a rating")
    }

    const tripToReview = await Trip.findById(req.params.id)
    if(!tripToReview) {
        res.status(404)
        throw new Error("Trip to review not found")
    }




    
    if (comment) {
        if (tripToReview.numOfRatings > 0) {
            let newRating = 0
            newRating = Number(tripToReview.rating * tripToReview.numOfRatings) + Number(rating);
            newRating = newRating / (tripToReview.numOfRatings + 1);
            const updatedTrip = await Trip.findOneAndUpdate({_id: req.params.id }, { $push: { comments: { text: comment, user: _id } } , $set: {numOfRatings: tripToReview.numOfRatings + 1, rating: newRating} } )
        } else {
            const updatedTrip = await Trip.findOneAndUpdate({_id: req.params.id }, { $push: { comments: { text: comment, user: _id } } , $set: {numOfRatings: tripToReview.numOfRatings + 1, rating: rating} } )
        }

        Trip_Event.create({
            user: _id,
            trip: tripToReview._id,
            eventType: 11,
        }, (err, savedTripEvent) => {
            if (err) {
                res.status(400)
                throw new Error("Could not create a review for trip event")
            }
        })

        res.status(200).json({_id: tripToReview._id})
    } else {
        if (tripToReview.numOfRatings > 0) {
            let newRating = 0
            newRating = Number(tripToReview.rating * tripToReview.numOfRatings) + Number(rating);
            newRating = newRating / (tripToReview.numOfRatings + 1);
             //updating the rating to new average
            const updatedTrip = await Trip.findOneAndUpdate({_id: req.params.id }, {$set: {numOfRatings: tripToReview.numOfRatings + 1, rating: newRating} } )
        } else {
            const updatedTrip = await Trip.findOneAndUpdate({_id: req.params.id }, {$set: {numOfRatings: tripToReview.numOfRatings + 1, rating: rating} } )
        }

        Trip_Event.create({
            user: _id,
            trip: tripToReview._id,
            eventType: 11,
        }, (err, savedTripEvent) => {
            if (err) {
                res.status(400)
                throw new Error("Could not create a review for trip event")
            }
        })

        res.status(200).json({_id: tripToReview._id})
    }







})



module.exports = {
    getTrips,
    setTrip,
    deleteTrip,
    updateTrip,
    getUsertrips,
    getOneTrip,
    sortTrips,
    cancelTrip,
    registerForTrip,
    unregisterForTrip,
    addTripReview,
    getOneAgentTrip,
}