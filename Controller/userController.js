const user = require('../Model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../Config/config');

//Funçoes Auxiliares
function createUserToken(userId) {
    return jwt.sign({ id: userId }, config.jwt_password, { expiresIn: config.jwt_expires_in });
}
//--------------------------------------------------------------------------------------------
exports.signUp = async (req, res) => {
    const { nome, email, senha, telefones } = req.body;
    // verificar se ja tem todos dados suficiente
    if (!nome || !email || !senha || !telefones) return res.status(400).send({ message: 'Dados insuficiente' });
    try {
        // verificar se tem usuario ja cadastrado
        if (await user.findOne({ email })) return res.status(400).send({ message: 'E-mail já existente' });

        //criação das datas
        const dateInformation = {
            creationDate: new Date(),
            updateDate: new Date(),
            lastLoginDate: new Date()
        }

        // criação do usuario
        const data = await user.create({ ...req.body, dateInformation });

        // retorno do sucesso
        return res.status(201).send({
            message: 'Usuário cadastrado com sucesso',
            id: data._id,
            usuário: data.email,
            data_criacao: data.dateInformation.creationDate,
            data_atualizacao: data.dateInformation.updateDate,
            ultimo_login: data.dateInformation.lastLoginDate,
            token: createUserToken(data.id)
        });
    }
    catch (err) {
        return res.status(500).send({ message: 'erro no api ' + err });
    }
}
//--------------------------------------------------------------------------------------------
exports.signIn = async (req, res) => {
    const { email, senha } = req.body;
    // verificar se ja tem todos dados suficiente
    if (!email || !senha) return res.status(400).send({ message: 'Dados insuficiente!' });
    try {
        // verificar se o usuario ja ta cadastrado
        let data = await user.findOne({ email });
        if (!data) return res.status(400).send({ message: 'Usuário e/ou senha inválidos' });

        // validar a senha
        const senha_ok = await bcrypt.compare(senha, data.senha);
        if (!senha_ok) return res.status(401).send({ message: 'Usuário e/ou senha inválidos' });

        // alterar ultimo login
        const dateInformation = data.dateInformation;
        user.updateOne({ email: email }, {
            dateInformation: {
                creationDate: dateInformation.creationDate,
                updateDate: dateInformation.updateDate,
                lastLoginDate: new Date(),
            }
        });
        data = await user.findOne({ email });

        // retorno do sucesso
        return res.send({
            mensagem: 'Usuário logado com sucesso',
            id: data._id,
            usuário: data.email,
            data_criacao: data.dateInformation.creationDate,
            data_atualizacao: data.dateInformation.updateDate,
            ultimo_login: data.dateInformation.lastLoginDate,
            token: createUserToken(data.id)
        });
    }
    catch (err) {
        return res.status(500).send({ message: 'erro no api ' + err });
    }
}
//--------------------------------------------------------------------------------------------
exports.findUser = async (req, res) => {
    try {
        //procurar o usuario
        const data = await user.findOne({ _id: req.query.id });
        if (data.length == 0) return res.status(400).send({ message: 'Usuário inexistente!' });
        return res.send({usuário: data.email});
    }
    catch (err) {
        return res.status(500).send({ message: 'erro no api ' + err });
    }
}
