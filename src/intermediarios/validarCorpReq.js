const validarCorpoReq = joiEsquema => async (req, res, next) => {
    
    try {

        await joiEsquema.validateAsync(req.body)

        next()
        
    } catch (error) {

        return res.status(400).json({
            message: error.message
        })  
    }
}

module.exports = validarCorpoReq