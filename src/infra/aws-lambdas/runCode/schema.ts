import Joi from "joi";

const schema = Joi.object({
  codeText: Joi.string().required(),
}).required();

export default schema;
