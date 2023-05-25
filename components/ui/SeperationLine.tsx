import { Breakpoint, styled } from '@mui/material/styles';
import StyledBox from './StyledBox';

interface ISeperatorLine {
  lineSize?: false | Breakpoint | undefined;
  separateContent?: boolean;
}

const SeperatorLine = ({
  lineSize = 'xl',
  separateContent = false,
}: ISeperatorLine) => {
  const backgroundGradient = !separateContent
    ? 'radial-gradient(circle, #46ee9a 0%, #b7e6f07b 100%);'
    : null;
  const lineColor = separateContent ? '#ebf3f57a' : null;

  const SeperationLine = styled('div')`
    width: 100%;
    background-image: ${backgroundGradient};
    height: 1px;
    border-radius: 10px;
    background-color: ${lineColor};
  `;

  return (
    <StyledBox
      marginB={separateContent ? '1rem' : undefined}
      marginT={separateContent ? '0px' : undefined}
      widthSize={lineSize}
    >
      <SeperationLine />
    </StyledBox>
  );
};

export default SeperatorLine;
