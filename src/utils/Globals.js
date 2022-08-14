import CONS from './Constants';

export const getArbitRestUrl = () => {
  return 'https://jsonplaceholder.typicode.com';
};

export const companyStartDate = () => {
  return new Date().getFullYear() > 2022 ? `2022 - ${new Date().getFullYear()}` : '2022';
};

export const isInvalid = (param) => {
  return typeof param === 'undefined' || (!param && typeof param === 'object') || (!param && typeof param === 'number') || !param;
};
export const doSetForwardslash = (hasForwardslash = true, ...endPoints) => {
  if (isInvalid(endPoints.length)) throw new Error('Your input array should contain at least one element');
  const hasFS = CONS.STR_FORWARDSLASH + endPoints.join(CONS.STR_FORWARDSLASH);
  return hasForwardslash ? (hasFS.startsWith('//') ? hasFS.replace('//', '/') : hasFS) : endPoints.join(CONS.STR_FORWARDSLASH);
};

export const doSetFullUrl = (hasForwardslash = true, ...endPoints) => {
  if (isInvalid(endPoints.length)) throw new Error('Your input array should contain at least one element');
  const hasFS = CONS.STR_FORWARDSLASH + endPoints.join(CONS.STR_FORWARDSLASH);
  return hasForwardslash ? (hasFS.startsWith('//') ? getArbitRestUrl() + hasFS.replace('//', '/') : getArbitRestUrl() + hasFS) : getArbitRestUrl() + hasFS;
};
