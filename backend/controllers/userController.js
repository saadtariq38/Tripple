// @desc    Get user info
// @route   GET /api/user/me
// @access  Private
const getMe = (req, res) => {
    res.status(200).json({ message: "get user info"})
}

// @desc    Get all auser info
// @route   GET /api/user
// @access  Private
const getAllUsers = (req, res) => {
    res.status(200).json({ message: 'Get all user info'})
}

// @desc    Create new user account
// @route   POST /api/user/register
// @access  Private
const registerUser = (req, res) => {
    res.status(200).json({ message: 'register a user'})
}

// @desc    Log into user account
// @route   POST /api/user/login
// @access  Private
const loginUser = (req, res) => {
    res.status(200).json({ message: 'login user account'})
}


// @desc    Delete user with id
// @route   DELETE /api/user/:id
// @access  Private
const deleteUser = (req, res) => {
    res.status(200).json({ message: `user deleted with id:${req.params.id}`})
}

// @desc    Update user info with id
// @route   PUT /api/user/:id
// @access  Private
const updateUser = (req, res) => {
    res.status(200).json({ message: `user info updated with id:${req.params.id}`})
}


module.exports = {
  getMe,
  getAllUsers,
  registerUser,
  deleteUser,
  updateUser,
  loginUser,
}