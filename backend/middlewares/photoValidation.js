const { body } = require("express-validator");

const photoValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O título da imagem não pode ser vazio!")
      .isString()
      .withMessage("O título da imagem deve ser uma string!")
      .isLength({ min: 5 })
      .withMessage("O título da imagem deve ter no mínimo 5 caracteres"),
    body("image").custom(async (image, { req }) => {
      if (!req.file) {
        throw new Error("Nenhuma imagem foi enviada!");
      }
      return true;
    }),
  ];
};

const photoTitleValidation = () => {
  return [
    body("title")
      .isString()
      .withMessage("O título é obrigatório!")
      .isLength({ min: 5 })
      .withMessage("O título da imagem deve ter no mínimo 5 caracteres"),
  ];
}

module.exports = { photoValidation, photoTitleValidation };
