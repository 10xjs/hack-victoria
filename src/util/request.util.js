import isEmpty from 'lodash/isEmpty';
import defaultsDeep from 'lodash/defaultsDeep';

export const applyDefaults = (request) => {
  const defaultInit = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Accept-Charset': 'utf-8',
      'Content-Type': 'application/json',
    },
    credentials: 'same-corigin',
    mode: 'cors',
  };

  return defaultsDeep({}, defaultInit, request);
};

export const sendRequest = (_fetch) => ({url, ...init}) => {
  return _fetch(url, init);
};

export const handleResponse = (res) => {
  if (parseInt(res.statusCode, 10) === 0) {
    throw new Error(`HTTP status code 0 fetching ${res.url}`);
  }

  if (!res.ok) {
    throw new Error(`${res.statusText} fetching ${res.url}`);
  }

  return res;
};

export const handleError = (error) => {
  console.error(error); // eslint-disable-line
  throw error;
};

export const createRequest = (_fetch) => (request) => {
  return Promise.resolve(request)
    .then(applyDefaults)
    .then(sendRequest(_fetch))
    .then(handleResponse)
    .catch(handleError);
};

export const parseJson = (res) => {
  return res.json()
    .then((json) => {
      if (isEmpty(json)) {
        throw new Error(`Empty JSON response.`);
      }

      return json;
    });
};

export const parseActionPayload = (res) => {
  return Promise.resolve(res)
    .then(parseJson)
    .catch(handleError);
};

export const createActionRequest = (request) => {
  return createRequest(fetch)(request).then(parseActionPayload);
};
