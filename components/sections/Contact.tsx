import { Typography } from '@mui/material';
import SectionTemplate from '../layout/SectionTemplate';

const ContactSection = () => {
  const contactHeading = 'Get in touch';
  return (
    <SectionTemplate heading={contactHeading}>
      <Typography>..lets get in touch.</Typography>
    </SectionTemplate>
  );
};

export default ContactSection;
