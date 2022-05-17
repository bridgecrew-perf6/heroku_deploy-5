const usersModel = require('../models/usersModel');
const userSchema = require('../schemas/UsersSchema');
const appError = require('../errors/appError');

const findAll = async () => usersModel.findAll();

const findById = async (id) => usersModel.findById(id);

const findByEmail = async (email) => usersModel.findByEmail(email);

const create = async (user) => {
    const {value, error} = userSchema.validate(user);
    if(error){
        throw new appError("Erro geral", 400);
    }

    const userEmail = await findByEmail(user.email);

    if(userEmail) {
        throw new appError("Email já cadastrado", 409);
    }

    return usersModel.create(value)
}

const edit = async (id, user) => {
    const {error} = userSchema.validate(user);
    if(error){
        throw new appError("Erro geral", 400);
    }

    return usersModel.edit(id, user);
}

const remove = async (id) => {
    try {
        return usersModel.removeById(id);
    } catch(error){
        throw new appError("Erro ao remover registro", 400);
    }
}

const createImage = async(id, image) => {
   return usersModel.createImage(id, image);
}

module.exports = {
    findAll,
    findById,
    create,
    edit,
    remove,
    createImage
}