const jwt = require('jsonwebtoken')

function admin(req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).send('Access denied. No token provided')

    if (req.user.isAdmin) next()
    else return res.status(403).send('Permission Denied')
}

module.exports = admin

//TAREK  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2YwYTExZWFjMGE5ZWYyZjI0YzJiM2YiLCJuYW1lIjoidGFyZWsiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjc2NzIzNzI4fQ.MjV2P1wo4qGpMgPTDLuHU986xtPxTwkVt0Q12XcARGU
//ADMIN  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U3NzE5NzM5YjE5ODZkNDk2NTI0ZDkiLCJuYW1lIjoiYWRtaW4iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NzY3MjM3NjR9.3ONoftpC_HXF4XLZwntBvuTUhiZNxfR4keV3A1-FrNA
