import styled from '@emotion/styled';
import StyledContainer from '../../StyledContainer';

const Seperator = () => {
  const SeperationLine = styled.div`
    width: 100%;
    background-image: radial-gradient(circle, #46ee9a 0%, #b7e6f07b 100%);
    height: 1px;
    border-radius: 10px;
  `;

  return (
    <StyledContainer widthSize="xl">
      <SeperationLine />
    </StyledContainer>
  );
};

export default Seperator;
