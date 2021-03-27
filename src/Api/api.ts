import env from '../environment/base';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

async function DetailList() {
  fetch('https://api.pexels.com/v1/curated?per_page=1', {
    headers: {
      Authorization: '563492ad6f91700001000001b76e90a45e4147ba8b7e52180bb62bea',
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      console.log(data.photos);
    });
  return axios
    .get('https://api.pexels.com/v1/curated?per_page=1')
    .then((response) => response)
    .catch(function (error) {
      return error;
    });
}

async function DetailData(val: string, KeyValue: number) {
  return axios
    .get('https://api.pexels.com/v1/curated?per_page=1')
    .then((response) => response)
    .catch(function (error) {
      return error;
    });
}

export { DetailList, DetailData };
