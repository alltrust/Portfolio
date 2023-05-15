import { NextApiRequest, NextApiResponse } from 'next';
import { ContactMessage } from '../schema/models/Contact';

const createContactMessage = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const contact = new ContactMessage(req.body);

    await contact.save();

    return res.status(200).json({
      message: `Thanks for your submission, ${req.body.name}.`,
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Could not send your message at this time.',
    });
  }
};

export default createContactMessage;
