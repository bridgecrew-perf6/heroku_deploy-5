const jwt = require('jsonwebtoken');
const { jwtData } = require('../config/auth');
const userModel = require('../models/usersModel');
const appError = require('../errors/appError');

module.exports = async(request, _response, next) => {
    const token = request.headers.authorization;

    if(!token) throw new appError("Sem token", 401);

    try{
        const decodedVerified = jwt.verify(token, jwtData.secret);
        const user = await userModel.
        findByEmail(decodedVerified.data.email);

        if(!user) throw new appError('JWT inconsistente', 401);

        request.user = user;

        return next();
    } catch(err){
        throw new appError('JWT inconsistente', 401);
    }
}