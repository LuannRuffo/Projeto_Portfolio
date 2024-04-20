const knex = require('../bancoDeDados/conexao');
const bcrypt = require('bcrypt');

const logins = async (req, res) => {
     
    const { username , password } = req.body

    return res.status(201).json({ message: "respota backend" })
}

const cadastro = async (req, res) => {
    
    try {
         
        const { name, senha, email, username } = req.body

        if (await knex('usuarios').where({ email }).first()) {

            return res.status(400).json({ message: "Email já esta sendo usado" })
         }

         if (await knex('usuarios').where({ username }).first()) {

            return res.status(400).json({ message: "Username já esta sendo usado" })
         }

        const senhaCryptografada = await bcrypt.hash(senha, 10)

        await knex('usuarios').insert({
            name,
            email,
            username,
            senha: senhaCryptografada
        })

        return res.status(201).json({ message: 'Cadastro feito com sucesso'})

    } catch (error) {

        return res.status(500).json({ message: error.message })

    }
}

module.exports = {
    logins,
    cadastro
}