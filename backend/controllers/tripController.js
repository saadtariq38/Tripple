
// @desc    Get all trips
// @route   GET /api/trips
// @access  Private
const getTrips = (req, res) => {
    res.status(200).json({ message: 'Get trips'})
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
}