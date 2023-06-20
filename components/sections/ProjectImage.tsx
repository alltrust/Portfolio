import { useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { IProject } from '../../types/app/Iproject';

interface IProjectImage {
  isMobile: boolean;
  slug: IProject['slug'];
  image: IProject['image'];
  imageRef: (node?: Element | null | undefined) => void;
  imageInView: boolean;
}

const ProjectImage = ({
  imageRef,
  imageInView,
  isMobile,
  slug,
  image,
}: IProjectImage) => {
  const theme = useTheme();

  return (
    <Box
      ref={imageRef}
      sx={{
        marginBottom: isMobile ? '2rem' : 0,
        opacity: imageInView ? 1 : 0,
        transition: 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out',
        textAlign: 'center',
        marginRight: isMobile ? '' : '1%',
      }}
    >
      <NextLink href={`/projects/${slug}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <NextImage
            src={`/images/projects/${image}`}
            alt={`${image}`}
            width={!isMobile ? 500 : 350}
            height={!isMobile ? 375 : 250}
            style={{
              objectFit: 'cover',
              boxShadow: theme.shadows[5],
              borderRadius: '2%',
            }}
          />
        </motion.div>
      </NextLink>
    </Box>
  );
};

export default ProjectImage;
