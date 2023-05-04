import Container from '@mui/material/Container';


interface IContactModal {
  children?: React.ReactNode;
  modalClose?: () => void;
  modalOpen?: () => void;
}

const Modal = ({ children, modalClose, modalOpen }: IContactModal) => {
  return (
    <Container>
      
    </Container>
  );
};

export default Modal;
