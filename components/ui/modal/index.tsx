import useAppContext from '../../../hooks/useAppContext';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

interface IModal {
  children: React.ReactNode;
}

const Modal = ({ children }: IModal) => {
  const { state, stateFns } = useAppContext();
  const {showModal} = state
  const {handleModalClose} = stateFns

  return (
    <Container>
      <Dialog open={showModal} onClose={handleModalClose}>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </Container>
  );
};

export default Modal;
