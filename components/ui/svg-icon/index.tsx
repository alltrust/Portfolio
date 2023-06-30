import Box from '@mui/material/Box';
import NextImage from 'next/image';
import { styled } from '@mui/material/styles';

interface ISvgIcon {
  svgLink: string;
}

const StyledNextImg = styled(NextImage)(({ theme }) => ({
  fill: theme.palette.primary.main,
}));

const SvgIcon = ({ svgLink }: ISvgIcon) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <StyledNextImg src={svgLink} alt="logo" width={50} height={50} />
    </Box>
  );
};

export default SvgIcon;
