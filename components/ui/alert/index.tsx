import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useAppContext from '../../../hooks/useAppContext';

const AlertDisplay = () => {
  const { state, dispatch } = useAppContext();
  const { message, variant, display } = state.alert;

  const handleClose = () => {
    dispatch({ type: 'ALERT', payload: { display: false } });
  };

  return (
    <Snackbar open={display} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={variant} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
export default AlertDisplay;
