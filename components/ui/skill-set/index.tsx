import { useState } from 'react';
import useAppContext from '../../../hooks/useAppContext';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import NextImage from 'next/image';
import {
  formatTimeSince,
  calcTimeDuration,
} from '../../../utils/calculateTime';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from '../../../utils/SkillsList';
import { IInitialIconFocusValues } from '../../../types/app/IInitialIconFocusValues';
import SkillSlideWithTimeDisplay from './SkillSlideWithTimeDisplay';
import useMediaQuery from '@mui/material/useMediaQuery';

const SkillSetCluster = () => {
  const { dispatch } = useAppContext();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const initialIconFocus = {
    timeSince: '',
    svg: '',
    svgForDark: '',
    isFocused: false,
    name: '',
  };

  const [iconFocused, setIconFocused] =
    useState<IInitialIconFocusValues>(initialIconFocus);

  const [iconContainerRef, iconContainerInView] = useInView({
    triggerOnce: true
  });

  const handleIconFocused = (
    timeSince: string,
    svg: string,
    name: string,
    svgForDark?: string
  ) => {
    dispatch({ type: 'TECH_SELECT', payload: name });

    setIconFocused({
      ...iconFocused,
      isFocused: false,
    });

    setTimeout(() => {
      setIconFocused({
        name: name,
        isFocused: true,
        timeSince: timeSince,
        svg: svg,
        svgForDark: svgForDark ? svgForDark : undefined,
      });
    }, 500);
  };

  return (
    <Box display={'flex'} flexDirection={'column-reverse'}>
      <SkillSlideWithTimeDisplay iconFocused={iconFocused} />
      <Box
        
        sx={{width:!isMobile ? "60%" : "100%" ,margin: 'auto' }}
        ref={iconContainerRef}
      >
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          {skills.map((skill, idx) => {
            const { svg, name, startDate, svgForDark } = skill;

            const timeSince = formatTimeSince(calcTimeDuration(startDate));
            const delayTime = (idx * 0.1 + 1) / 2;

            return (
              <Grid key={name} item>
                {iconContainerInView ? (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      transition: {
                        type: 'spring',
                        stiffness: 200,
                        delay: delayTime,
                      },
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                    }}
                    onClick={handleIconFocused.bind(
                      null,
                      timeSince,
                      svg,
                      name,
                      svgForDark
                    )}
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.2,
                        transition: {
                          type: 'spring',
                          stiffness: 400,
                          damping: 10,
                          delay: 0,
                        },
                        cursor: 'pointer',
                      }}
                    >
                      <NextImage
                        src={
                          theme.palette.mode === 'dark' && svgForDark
                            ? svgForDark
                            : svg
                        }
                        alt="logo"
                        width={50}
                        height={50}
                        style={{ margin: 1 }}
                      />
                    </motion.div>
                  </motion.button>
                ) : null}
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default SkillSetCluster;
