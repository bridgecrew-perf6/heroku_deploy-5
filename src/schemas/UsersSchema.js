const joi = require('joi');

//https://joi.dev/api/?v=17.6.0#number

module.exports = joi.object({
    name: joi.string().required().max(100),
    email: joi.string().required().max(100).email(),
    password: joi.string().required().max(50),
    role: joi.string().default('usuario').max(8),
    salary: joi.number().max(999999)
})