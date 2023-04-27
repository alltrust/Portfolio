import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';

interface IContactModal {
  children?: React.ReactNode;
  modalClose?: () => void;
  modalOpen?: () => void;
}

const ContactModal = ({ children, modalClose, modalOpen }: IContactModal) => {
  return (
    <Container>
      <Box>
        {/* <Image src="" alt="" fill /> */}
        <Typography> SOME TITLE HERE</Typography>
      </Box>
      <Box>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1 } }}
          autoComplete="off"
        >
          <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">
              We willl never share your email.
            </FormHelperText>
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactModal;
