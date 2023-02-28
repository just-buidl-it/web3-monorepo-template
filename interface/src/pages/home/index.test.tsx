import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '.';
import Context from '../../context';

describe('home page', () => {
  test('renders learn react link', () => {
    render(
      <Context>
        <Home />
      </Context>
    );
    const linkElement = screen.getByText(/connect/i);
    expect(linkElement).toBeInTheDocument();
  });
});
