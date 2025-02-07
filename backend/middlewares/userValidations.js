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
        .isStrongPassword().withMessage("A senha precisa ser forte!"),
        body("confirmpassword")
        .isString().withMessage("Confirme a sua senha!")
        .custom((value, {req})=>{
            if(value != req.body.password) {
                throw new Error("As senhas não são iguais");
            }
            return true;
        })
    ]
}

module.exports = {userCreateValidation};