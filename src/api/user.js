import { get, post } from '../utils/request';
const URL_LOGIN = '/login';
const URL_GET_PUBLIC_KEY = '/public_key';

export function login(params)  {
  return post(URL_LOGIN, params);
}

export function getPubKey()  {
  return get(URL_GET_PUBLIC_KEY);
}