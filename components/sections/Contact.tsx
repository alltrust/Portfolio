import useAppContext from '../../hooks/useAppContext';
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SectionTemplate from '../layout/SectionTemplate';
import useMediaQuery from '@mui/material/useMediaQuery';
import PersonalLinks from './PersonalLinks';

const StyledContactBtn = styled(Button)(({ theme }) => ({
  fontSize: '2rem',
  padding: theme.spacing(2, 4),
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  border: `2px solid ${theme.palette.primary.dark}`,
  '&:hover': {
    color: theme.palette.primary.dark,
  },
}));

const ContactSection = () => {
  const { stateFns } = useAppContext();
  const { handleModalOpen } = stateFns;
  const theme = useTheme();
  const xsScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <SectionTemplate showSeperator={false} isFooter>
      <StyledContactBtn onClick={handleModalOpen}>
        ..lets get in touch
      </StyledContactBtn>
      <PersonalLinks/>
      <Typography component={xsScreen ? "h4" : 'h2'} variant={xsScreen ? "h4" : 'h1'}>
        aldo@argarcia.dev
      </Typography>
    </SectionTemplate>
  );
};

export default ContactSection;
