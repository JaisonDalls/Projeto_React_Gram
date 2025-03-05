const {body} = require('express-validator');

const userCreateValidation = () => {
    return [
        body('name')
        .isString().withMessage("O nome é obrigatório!")
        .isLength({min:3}).withMessage("O nome deve conter mais de 3 caracteres!"),
        body('email')
        .isString().withMessage("O e-mail é obrigatório!")
        .isEmail().withMessage("Insira um email válido!"),
        body('password')
        .isString().withMessage("A senha é obrigatória!")
        .isLength({min:5}).withMessage("A senha deve conter no mínimo 5 caracteres!")
        .isStrongPassword().withMessage("A senha precisa ser forte!")
    ]
}

const loginValidation = () =>{
    return [
        body('email')
        .isString().withMessage("Favor insira seu e-mail!")
        .isEmail().withMessage("Insira um e-mail válido!"),
        body('password')
        .isString().withMessage("Insira sua senha!")
    ]
}

const userUpdateValidation = () =>{
    return [
        body('name')
        .optional()
        .isLength({min: 3})
        .withMessage("O nome deve conter mais de 3 caracteres!"),
        body('password')
        .optional()
        .isLength({min:5}).withMessage("A senha deve conter no mínimo 5 caracteres!")
    ]
}

module.exports = {userCreateValidation, loginValidation, userUpdateValidation};