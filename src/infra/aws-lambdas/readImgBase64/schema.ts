import Joi from "joi";

const base64Regex = /^data:[a-zA-Z0-9/;,:]+;base64,([a-zA-Z0-9+/=]+)$/;

const schema = Joi.object({
  imgBase64: Joi.string().required().regex(base64Regex),
}).required();

export default schema;
