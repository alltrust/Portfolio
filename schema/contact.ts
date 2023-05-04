import * as Yup from 'yup';

const contactSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  message: Yup.string().required('Message is required'),
});

export type IContactValues = Yup.InferType<typeof contactSchema>


export default contactSchema;

