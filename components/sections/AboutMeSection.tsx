import SectionTemplate from '../layout/SectionTemplate';
import SkillSetCluster from '../ui/skill-set';
import NextImage from 'next/image';
import NextLink from 'next/link';
import IsMobileBox from '../ui/IsMobileBox';
import Slide from '@mui/material/Slide';
import { useInView } from 'react-intersection-observer';
import useAppContext from '../../hooks/useAppContext';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface IAboutMeSection {
  projectNamesWithLinks: {
    name: string;
    links: string[];
    slug: string;
    stack: string[];
  }[];
}
const AboutMeSection = ({ projectNamesWithLinks }: IAboutMeSection) => {
  const [imageRef, ImageInView] = useInView({});

  const { dispatch } = useAppContext();

  useEffect(() => {
    dispatch({ type: 'ALL_NAMES_WITH_LINKS', payload: projectNamesWithLinks });
  }, []);

  return (
    <SectionTemplate heading={`Click To Discover`}>
      <IsMobileBox>
        <Slide in={ImageInView} direction="right" timeout={{ enter: 1000 }}>
          <NextLink href={'/about'}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <NextImage
                ref={imageRef}
                src={'/images/about/pixl_dp_q.png'}
                alt={'pixelated display picture'}
                width={300}
                height={400}
              />
            </motion.div>
          </NextLink>
        </Slide>
        <SkillSetCluster />
      </IsMobileBox>
    </SectionTemplate>
  );
};

export default AboutMeSection;
