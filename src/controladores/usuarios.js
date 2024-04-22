const knex = require('../bancoDeDados/conexao');
const bcrypt = require('bcrypt');
const { sign } = require("jsonwebtoken");

const logins = async (req, res) => {
     
    const { username , password } = req.body

    const usuario = await knex('usuarios').where({ username }).first().returning()

    if (!usuario) {

        return res.status(404).json({ message: 'Senha ou Email incorreto'})
    }

    const senhaCorreta = !await bcrypt.compare(password, usuario.senha)

    if (senhaCorreta){

        return res.status(404).json({
            mensagem: "Senha ou email incorreto"
        })
    }

    let { senha: senhaUsuario, ...usuarioSemSenha } = usuario

    const token = sign(
        {
            id: usuarioSemSenha.id
        },
        'senhajtw',
        {
            'expiresIn': '8h'
        }
    )

    return res.status(200).json({
        message: "login feito com sucesso",
        token
    })
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

const painelUsuario = async (req, res) => {

    try {

        
        
    } catch (error) {
        
        return res.status(500).json({ message: error.message })
        
    }
}

module.exports = {
    logins,
    cadastro,
    painelUsuario
}