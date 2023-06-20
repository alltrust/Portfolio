import { ReactNode, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { createHref } from '../../../utils/createHref';
import { Variant } from '@mui/material/styles/createTypography';
import { useInView } from 'react-intersection-observer';
import useAppContext from '../../../hooks/useAppContext';
import Typography from '@mui/material/Typography';
import SeperatorLine from '../../ui/SeperationLine';

interface ICustomHeading {
  children: ReactNode | ReactNode[];
  variant: Variant;
}

const CustomHeading = ({ children, variant }: ICustomHeading) => {
  const theme = useTheme();
  const headerHref = createHref(children);
  const { state, dispatch } = useAppContext();

  const {
    ref: headingRef,
    inView: headingInView,
    entry: headingEntry,
  } = useInView({
    threshold: 1,
  });

  //create a fn that takes in the entryEl id and checks if the
  // headingInView elId is the same as the TOC name and apply styles
  //and check is the previous state id is currently not in view ... maybe look for alternatives too

  useEffect(()=>{
    if (headingInView && state.blogSubheadingId !== headingEntry?.target.id) {
      dispatch({type:"FOCUS_TOC_HEADING", payload: headingEntry?.target.id})
    }
    
  },[headingInView, headingEntry?.target.id, state.blogSubheadingId, dispatch])

  
  return (
    <>
      <SeperatorLine id={`${headerHref}`} />
      <Typography
        ref={headingRef}
        id={`${headerHref}`}
        variant={variant}
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
