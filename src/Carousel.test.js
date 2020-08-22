import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';

it('should render a carousel', () => {
  render(<Carousel />);
});

it('should match the carousel snapshot', () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment).toMatchSnapshot();
});

it('works when you click on the right arrow', function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).toBeInTheDocument();
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId('right-arrow');
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).not.toBeInTheDocument();
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).toBeInTheDocument();
});

it('should go to the first image when clicking the left arrow', () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  //moving forward in the carousel to sent the image on the second image
  const rightArrow = queryByTestId('right-arrow');
  fireEvent.click(rightArrow);

  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).not.toBeInTheDocument();
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).toBeInTheDocument();

  const leftArrow = queryByTestId('left-arrow');
  fireEvent.click(leftArrow);

  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).not.toBeInTheDocument();

  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).toBeInTheDocument();
});

it('Should hide the left arrow when on the first image', () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  const leftArrow = queryByTestId('left-arrow');

  //make sure we are on the first image
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).toBeInTheDocument();

  expect(leftArrow).not.toBeInTheDocument();

  //make sure the right arrow still shows
  const rightArrow = queryByTestId('right-arrow');
  expect(rightArrow).toBeInTheDocument();
});

it('Should hide the right arrow when on the last image', () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  const rightArrow = queryByTestId('right-arrow');

  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  //make sure we are on the first image
  expect(queryByAltText('Photo by Josh Post on Unsplash')).toBeInTheDocument();

  expect(rightArrow).not.toBeInTheDocument();

  //make sure the right arrow still shows
  const leftArrow = queryByTestId('left-arrow');
  expect(leftArrow).toBeInTheDocument();
});
