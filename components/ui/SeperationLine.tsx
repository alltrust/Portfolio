import {styled} from "@mui/material/styles";
import StyledBox from './StyledBox';

const SeperatorLine = () => {
  const SeperationLine = styled("div")`
    width: 100%;
    background-image: radial-gradient(circle, #46ee9a 0%, #b7e6f07b 100%);
    height: 1px;
    border-radius: 10px;
  `;

  return (
    <StyledBox widthSize="xl">
      <SeperationLine />
    </StyledBox>
  );
};

export default SeperatorLine;
