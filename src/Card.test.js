import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';

it('should render a card', () => {
  render(<Card />);
});

it('should match the card snapshot', () => {
  const { asFragment } = render(<Card />);
  expect(asFragment).toMatchSnapshot();
});
