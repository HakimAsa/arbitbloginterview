const ErrorOnRequests = (error) => {
  if (typeof error === 'string') return error;
  if (error.response) {
    if (typeof error.response.data === 'string') return error.response.data;
    return error.response.data.errorMessage;
  }
  return error.message;
};

export default ErrorOnRequests;
