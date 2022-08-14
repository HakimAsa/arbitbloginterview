import axios from 'axios';
import HM from '../utils/HttpVerbs';

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const httpRequest = async (endpoint, method, json) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const res = method === HM.GET || method === HM.DELETE ? await axios[method](endpoint, config) : await axios[method](endpoint, json, config);

  return res;
};
