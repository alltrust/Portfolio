import mongoose, { Document } from 'mongoose';
import { IContactValues } from '../contact';

const ContactMessageSchema = new mongoose.Schema<IContactValues>({
  name: String,
  email: String,
  message: String,
});

interface IContactModel extends IContactValues, Document {}

const ContactMessage = mongoose.model<IContactModel>(
  'Contact',
  ContactMessageSchema
);

export { ContactMessage };
