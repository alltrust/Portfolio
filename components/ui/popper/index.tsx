import Popper, { PopperPlacementType } from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { textDefinitionHelpers } from '../../../lib/textDefinitionHelpers';
import { useTheme } from '@mui/material/styles';

interface IDescriptionPopper {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  placement?: PopperPlacementType | undefined;
  description: string;
}

const DescriptionPopper = ({  
  open,
  anchorEl,
  placement = 'top',   
  description,
}: IDescriptionPopper) => {
  const content = textDefinitionHelpers[description] || 'description not found';
  const theme = useTheme();
 
  return (
    <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper sx={{ border: `1px solid ${theme.palette.primary.main}` }}>
            <Typography sx={{ p: 2, maxWidth: '25rem' }}>{content}</Typography>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

export default DescriptionPopper;
