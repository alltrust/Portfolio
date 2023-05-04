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
      message: `Thanks for your submission, ${req.body.name}. Aldo will recieve your message shortly.`,
    });
  } catch (err) {
    return res.status(500).json({
      error: { message: 'Could not create and send your message.', err: err },
    });
  }
};

export default createContactMessage;
