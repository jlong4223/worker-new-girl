import Joi from "joi";
import { validationErrorRes } from "../utils/responses";

interface RequestWithVerifiedBody extends Request {
  verifiedBody: any;
}

export const getValidation =
  (schema: Joi.ObjectSchema<any>) =>
  async (request: RequestWithVerifiedBody) => {
    const body = await request.json();
    const { error } = schema.validate(body);

    if (error) {
      return validationErrorRes(error.message);
    }

    request.verifiedBody = body;
  };
