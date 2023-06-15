import { ReactNode, useState } from 'react';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';
import { PopperPlacementType } from '@mui/material/Popper';
import useAppContext from '../../../hooks/useAppContext';
import DescriptionPopper from '../../ui/popper';

interface IStrongRenderer {
  children: ReactNode & ReactNode[];
}

const StrongRenderer = ({ children }: IStrongRenderer) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();

  const handlePopperClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  // onlick open modal or have a slide come out with description of the children word.

  //function to find the word with the description from the lib textDefinitions object

   const description = children.toLocaleString()

  return (
    <>
    <DescriptionPopper open={open} anchorEl={anchorEl} description={description}/>
    <Button
      sx={{ color: theme.palette.secondary.dark, display: 'inline-block' }}
      onClick={handlePopperClick('top')}
    >
      {children}
    </Button>
    </>
  );
};

export default StrongRenderer;
