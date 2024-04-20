const { Router } = require("express");
const { logins, cadastro} = require("./controladores/usuarios")
const esquemaCadastro = require("./esquemas/esquemaCadastro")
const validarCorpReq = require("./intermediarios/validarCorpReq")

const rotas = Router();

rotas.post("/login", logins)
rotas.post("/cadastro", validarCorpReq(esquemaCadastro), cadastro)

module.exports = rotas