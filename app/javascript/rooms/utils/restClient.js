import axios from 'axios';

export function get(url, body) {
  if (body) {
    const params = { params: body };
    return axios.get(url, params).then(response => response).catch(error => error.response);
  }
  return axios.get(url).then(response => response).catch(error => error.response);
}

export function post(url, body) {
  return axios.post(url, body).then(res => res).catch(error => error.response);
}

export function patch(url, body) {
  return axios.patch(url, body).then(res => res).catch(error => error.response);
}
