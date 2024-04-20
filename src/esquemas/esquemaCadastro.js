const joi = require('joi')

const esquemaCadastro = joi.object({
    
    email: joi.string().email().required().trim().messages({
        'string.email': 'O campo email precisa ter um formato válido',
		    'any.required': 'O campo email é obrigatório',
		    'string.empty': 'O campo email é obrigatório',    
    }),

    name: joi.string().required().trim().messages({
		    'any.required': 'O campo nome é obrigatório',
		    'string.empty': 'O campo nome é obrigatório',
    }),

    senha: joi.string().required().trim().min(6).messages({
        'string.min': 'O campo senha deve ter no minimo 6 caracteres',
        'string.empty': 'O campo senha é obrigatório',
        'any.required': 'O campo senha é obrigatório',
    }),

    username: joi.string().required().trim().messages({
		    'any.required': 'O campo nome é obrigatório',
		    'string.empty': 'O campo nome é obrigatório',
    })
})

module.exports = esquemaCadastro