import type { NextApiRequest, NextApiResponse } from 'next';
import contactSchema from '../../schema/validation/contact';
import validate from '../../middleware/vaildate';
import createContactMessage from '../../controllers/contactController';
import connectDb from '../../utils/db-connect';

connectDb();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return await createContactMessage(req, res);
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}

export default validate(handler, contactSchema);
