const jwt = require('jsonwebtoken');
const config = require('../Config/config')

const auth = (req, res , next)=>{
    const token_header = req.headers.authorization;
    // verificar se tem o token
    if(!token_header) return res.status(401).send({error: 'Não autorizado'});
    // formatar o token
    const token = token_header.replace('Bearer ', '');
    // verificar o token
    jwt.verify(token, config.jwt_password ,(err, decoded)=>{
        if(err) return res.status(401).send({ error: 'Não autorizado'});
        res.locals.auth_data = decoded;
        return next();
    });

}

module.exports = auth;