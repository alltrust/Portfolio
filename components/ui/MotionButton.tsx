import { motion } from 'framer-motion';
import Box from '@mui/material/Box';

interface IMotionButton {
  children: React.ReactNode;
  onClick?: () => void;
  cursor?: boolean;
  tab?: boolean;
}

const MotionButton = ({ children, onClick, cursor, tab }: IMotionButton) => {
  return (
    <Box
      sx={{
        width: !tab ? '2rem' : 'inherit',
        cursor: cursor ? 'pointer' : null,
      }}
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        onClick={onClick}
        style={{ display: 'flex', padding: '5px' }}
      >
        {children}
      </motion.div>
    </Box>
  );
};

export default MotionButton;
