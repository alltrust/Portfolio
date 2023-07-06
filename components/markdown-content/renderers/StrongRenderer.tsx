import { ReactNode, useState } from 'react';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';
import { PopperPlacementType } from '@mui/material/Popper';
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

   const description = children.toLocaleString()

  return (
    <>
    <DescriptionPopper open={open} anchorEl={anchorEl} description={description}/>
    <Button
      sx={{ color: theme.palette.secondary.dark, display: 'inline-block', padding: '0px 0px', minWidth: `5px` }}
      onClick={handlePopperClick('top')}
    >
      {children}
    </Button>
    </>
  );
};

export default StrongRenderer;
