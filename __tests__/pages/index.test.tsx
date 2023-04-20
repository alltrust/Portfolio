import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../pages/index';

const renderHomePage = ()=>{

  render(
    <Home></Home>
  );

};

describe('<index>', ()=>{

  test('should display content', ()=>{

    renderHomePage();

    const helloHeading = screen.getByRole('heading', { name: /hellox/i });

    expect(helloHeading).toBeInTheDocument();

  });

});