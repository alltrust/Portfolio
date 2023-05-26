import { motion } from 'framer-motion';
import Box from '@mui/material/Box';

interface IMotionButton {
  children: React.ReactNode;
  onClick?: () => void;
  cursor?: boolean;
}

const MotionButton = ({ children, onClick, cursor }: IMotionButton) => {
  return (
    <Box sx={{ width: '2rem', cursor: cursor ? 'pointer' : null }}>
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
