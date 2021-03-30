import React from 'react';
import PhotoDetails from './PhotoDetails';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Intern Management/PhotoDetails',
  component: PhotoDetails,
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

export const PhotoDetails_Default = () => {
  return <PhotoDetails />;
};
