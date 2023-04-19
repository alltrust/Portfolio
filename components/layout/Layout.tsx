import React from 'react';
import MainHeader from './MainHeader';

interface ILayout {
  children: React.ReactNode
}

const Layout = ({ children }:ILayout)=>{

  return (
    <>
      <MainHeader/>
      <main>
        {children}
      </main>
    </>
  );

};

export default Layout;