const jwt = require("jsonwebtoken")


const generateAccessToken = ( id, role ) => {
    // payload = {
    //     "id": id,
    //     "role": role
    // }
    return jwt.sign({id , role}, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '40m',
    })
}

const generateRefreshToken = ( id, role ) => {
    // payload = {
    //     "id": id,
    //     "role": role
    // }
    return jwt.sign({id , role}, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = {
    generateAccessToken,
    generateRefreshToken
}