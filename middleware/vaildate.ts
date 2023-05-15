import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { ObjectSchema, Maybe, AnyObject } from 'yup';

const validate = (
  handler: NextApiHandler,
  schema: ObjectSchema<Maybe<AnyObject>>
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await schema.validate(req.body);

      await handler(req, res);
    } catch (err) {
      return res.status(400).json(err);
    }
  };
};

export default validate;
