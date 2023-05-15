import useAppContext from '../../../hooks/useAppContext';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

interface IModal {
  children: React.ReactNode;
}

const Modal = ({ children }: IModal) => {
  const { state, stateFns } = useAppContext();

  return (
    <Container>
      <Dialog open={state.showModal} onClose={stateFns.handleModalClose}>
        <DialogTitle>Contact</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </Container>
  );
};

export default Modal;
