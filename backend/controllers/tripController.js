
// @desc    Get all trips
// @route   GET /api/trips
// @access  Private
const getTrips = (req, res) => {
    res.status(200).json({ message: 'Get all trips'})
}

// @desc    Get user trips
// @route   GET /api/trips/userTrips
// @access  Private
const getUsertrips = (req, res) => {
    res.status(200).json({ message: 'Get user trips'})
}

// @desc    Get agent trips
// @route   GET /api/trips/agentTrips
// @access  Private
const getAgenttrips = (req, res) => {
    res.status(200).json({ message: 'Get agent trips'})
}

// @desc    Create new trip
// @route   POST /api/trips
// @access  Private
const setTrip = (req, res) => {
    res.status(200).json({ message: 'new trip created'})
}

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
    getAgenttrips,
}