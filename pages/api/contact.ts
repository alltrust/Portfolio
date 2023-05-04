import type { NextApiRequest, NextApiResponse } from 'next';
import contactSchema from '../../schema/contact';
import validate from '../../middleware/vaildate';
import connectDb from '../../utils/db-connect';
import createContactMessage from '../../controllers/contactController';

connectDb()

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  return await createContactMessage(req,res)
}

export default validate(contactSchema, handler);
