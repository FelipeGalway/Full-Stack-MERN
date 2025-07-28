import Joi from "joi";

export const recordSchema = Joi.object({
  nome: Joi.string()
    .min(3)
    .required()
    .messages({
      "string.base": "O nome deve ser um texto.",
      "string.empty": "O nome é obrigatório.",
      "string.min": "O nome deve ter pelo menos 3 caracteres.",
      "any.required": "O nome é obrigatório.",
    }),
  cargo: Joi.string()
    .min(3)
    .required()
    .messages({
      "string.base": "O cargo deve ser um texto.",
      "string.empty": "O cargo é obrigatório.",
      "string.min": "O cargo deve ter pelo menos 3 caracteres.",
      "any.required": "O cargo é obrigatório.",
    }),
  nivel: Joi.string()
    .valid("Júnior", "Pleno", "Sênior")
    .required()
    .messages({
      "any.only": "O nível deve ser um dos seguintes: Júnior, Pleno ou Sênior.",
      "string.empty": "O nível é obrigatório.",
      "any.required": "O nível é obrigatório.",
    }),
});

export const partialSchema = Joi.object({
  nome: Joi.string()
    .min(3)
    .messages({
      "string.base": "O nome deve ser um texto.",
      "string.empty": "O nome não pode ser vazio.",
      "string.min": "O nome deve ter pelo menos 3 caracteres.",
    }),
  cargo: Joi.string()
    .min(3)
    .messages({
      "string.base": "O cargo deve ser um texto.",
      "string.empty": "O cargo não pode ser vazio.",
      "string.min": "O cargo deve ter pelo menos 3 caracteres.",
    }),
  nivel: Joi.string()
    .valid("Júnior", "Pleno", "Sênior")
    .messages({
      "any.only": "O nível deve ser um dos seguintes: Júnior, Pleno ou Sênior.",
      "string.empty": "O nível não pode ser vazio.",
    }),
}).or("nome", "cargo", "nivel")
  .messages({
    "object.missing": "Informe ao menos um campo para atualizar.",
  });
