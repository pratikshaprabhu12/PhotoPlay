import React from 'react';
import Favourites from './Favourites';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Intern Management/Favourites',
  component: Favourites,
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'white', value: '#ffffff' },
        { name: 'light', value: '#f6f9fd' },
        { name: 'dark', value: '#121432' },
        { name: 'black', value: '#000000' },
      ],
    },
  },
};

export const Favourites_Default = () => {
  return <Favourites />;
};
