import { ReactNode } from 'react';
import { useTheme } from '@mui/material';
import { createHref } from '../../../utils/createHref';
import { Variant } from '@mui/material/styles/createTypography';
import { useInView } from 'react-intersection-observer';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import SeperatorLine from '../../ui/SeperationLine';

interface ICustomHeading {
  children: ReactNode | ReactNode[];
  variant: Variant;
}

const CustomHeading = ({ children, variant }: ICustomHeading) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const headerHref = createHref(children);

  const { ref: headingRef } = useInView({
    threshold: 1,
  });

  return (
    <>
      <SeperatorLine id={`${headerHref}`} />
      <Typography
        ref={headingRef}
        id={`${headerHref}`}
        variant={isMobile ? 'h4' : variant}
        sx={{
          marginTop: theme.spacing(4),
          marginBottom: theme.spacing(8),
        }}
      >
        {children}
      </Typography>
    </>
  );
};

export default CustomHeading;
