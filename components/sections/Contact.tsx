import { Typography } from '@mui/material';
import ContactForm from "../contact-form"
import SectionTemplate from '../layout/SectionTemplate';

const ContactSection = () => {
  const contactHeading = 'Get in touch';
  return (
    <SectionTemplate heading={contactHeading}>
      <Typography>..lets get in touch.</Typography>
      <ContactForm></ContactForm>

    </SectionTemplate>
  );
};

export default ContactSection;
