const { Router } = require("express");
const { logins, cadastro} = require("./controladores/usuarios")
const esquemaCadastro = require("./esquemas/esquemaCadastro")
const validarCorpReq = require("./intermediarios/validarCorpReq");
const autorizacaoLogado = require("./intermediarios/autorizacaoLogado");

const rotas = Router();

rotas.post("/login", logins)
rotas.post("/cadastro", validarCorpReq(esquemaCadastro), cadastro)
rotas.get("/painelUsuario", autorizacaoLogado)

module.exports = rotas