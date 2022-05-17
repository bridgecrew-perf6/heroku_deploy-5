const usersServices = require("../services/userServices");

const findAll = (async (_request, response) => {
    const results = await usersServices.findAll();
    response.json(results);
})

const findById = (async (request, response) => {
    const { id } = request.params;

    const result = await usersServices.findById(id);
    if (!result) {
        response.status(404)
            .json({ message: 'Usuário não localizado' })
    } else {
        response.json(result);
    }
})

const create = (async (request, response) => {
    //acessar os dados que vem do corpo da requisicao
    const { name, email, password, role, salary } = request.body;
    const { _id, ...user } = await usersServices.create({
        name,
        email,
        password,
        role,
        salary
    })
    response.status(201).json({
        name: user.name,
        email: user.email,
        role: user.role,
        salary: user.salary,
        _id: _id
    })
})

const edit = (async (request, response) => {
    const { id } = request.params;

    const results = await usersServices.edit(id, request.body);
    response.json(results);
})

const remove = (async (request, response) => {
    const { id } = request.params;

    await usersServices.remove(id);
    return response.status(204)
    .json({ message: "Usuário removido com sucesso"})
})

const createImage = (async(request, response) => {
    const { id } = request.params;
    const image = request.file ? request.file.filename : undefined;

    const fullUrl = `${request.get('host')}/uploads/${image}`;

    const results = await usersServices.createImage(id, fullUrl);
    response.json(results);
})

module.exports = {
    findAll,
    findById,
    create,
    edit,
    remove,
    createImage
};