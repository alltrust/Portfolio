import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';

const Page = styled.div<{theme:Theme}>`
  background-color: ${({ theme }) => theme.palette.primary.main};
  height: 100vh;
`;

interface IStyledPages{
    children:React.ReactNode
}
const StyledPage = ({ children }:IStyledPages)=>{

  const theme = useTheme();

  return(
    <Page theme={theme}>
      {children}
    </Page>

  );

};

export default StyledPage;