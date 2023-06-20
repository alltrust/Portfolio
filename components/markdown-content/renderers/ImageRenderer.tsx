import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import NextImage from 'next/image';
import Typography from '@mui/material/Typography';

interface IImageRenderer {
  paragraph: { children: ReactNode & ReactNode[]; node?: any };
}

const StyledImgWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  background: red;
`;

const ImageRenderer = ({ paragraph }: IImageRenderer) => {
  const theme = useTheme();
  const { node } = paragraph;

  if (node.children[0].tagName === 'img') {
    const image = node.children[0];
    const metastring = image.properties.alt;
    const alt = metastring?.replace(/ *\{[^)]*\} */g, '');
    const hasCaption = metastring?.toLowerCase().includes('{caption:');
    const caption = metastring?.match(/{caption: (.*?)}/)?.pop();

    return (
      <StyledImgWrapper>
        <NextImage
          src={image.properties.src}
          width={400}
          height={300}
          className="postImg"
          alt={alt}
          style={{ objectFit: 'cover' }}
        />
        {hasCaption ? (
          <Typography variant="body2" aria-label={caption}>
            {caption}
          </Typography>
        ) : null}
      </StyledImgWrapper>
    );
  }
  return (
    <>
      <br />
      <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
        {paragraph.children}
      </Typography>
      <br />
    </>
  );
};

export default ImageRenderer;
