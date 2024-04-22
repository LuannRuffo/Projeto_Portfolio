const jwt = require('jsonwebtoken')
const knex = require('../bancoDeDados/conexao')

const  autorizacaoLogado = async (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization || authorization === 'null') {

        return res.status(401).json({
         message: 'Você precisa estar logado para acessar esta página.'
        })
    }

    try {

        const { id } = jwt.verify(authorization, 'senhajtw')
        const usuario = await knex('usuarios').where({ id }).first()

        if (!usuario) { 

            return res.status(401).json({
                message: "Usuário não autorizado."
            })
        }

        req.usuario = usuario

        next()
        
    } catch (error) {
        
        return res.status(401).json({
            mensagem: "Usuário não autorizado."
        });
    }
}

module.exports = autorizacaoLogado