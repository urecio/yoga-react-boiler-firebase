import 'whatwg-fetch';
import cookie from 'react-cookie';
import { notify } from 'react-notify-toast';

/**
 * Convert an object of query parameters into a valid query string for
 * use in a url.  Note we don't include the '?'.
 *
 * E.g. paramsToQueryString({ a: 1, b: 2 }) == 'a=1&b=2'
 *
 * @param  {object} params The key / value params to serialize.
 * @return {string}        The valid query string.
 */
function paramsToQueryString(params) {
  return Object.keys(params).map((k) => {
    const key = encodeURIComponent(k);
    const value = encodeURIComponent(params[k]);
    return `${key}=${value}`;
  }).join('&');
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  let parsedResponse;

  if (response.headers.get('Content-Type').includes('json')) parsedResponse = await response.json();
  else {
    const message = await response.text();
    if (message.indexOf('{') !== -1) { // still a json, with a bad content type
      parsedResponse = JSON.parse(message);
    } else parsedResponse = { errors: [{ message }] };
  }

  throw parsedResponse;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
function request(url, options, requireAuth = true, token) {
  // create a copy of the options to be able to extend it
  const newOptions = Object.assign({}, options);

  // checking if for this request, we should include the Authorization
  if (requireAuth === true) {
    const accessToken = token || cookie.load('auth').accessToken;
    if (!accessToken) throw new Error('Invalid credentials');
    Object.assign(
      newOptions,
      { headers:
        Object.assign(options.headers || {}, { Authorization: accessToken }),
      },
    );
  }
  return fetch(`${process.env.API_ROOT_URL}${url}`, newOptions)
    .then(checkStatus)
    .then((response) => response.json())
    .catch((error) => {
      const parsedError = error.errors ? error : { errors: [{ message: 'Internal error' }] };
      const message = parsedError.errors[0].message;
      const ref = parsedError.errors[0].dataPath ?
                  `${error.errors[0].dataPath.replace('.', '').toLowerCase()}: ` :
                  ' ';

      notify.show(message ? `${ref}${message}` : 'Internal error', 'error');
      throw error;
    }); // eslint-disable-line
}

export {
  request,
};
