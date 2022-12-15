import { post } from '../utils/request';
const LOGIN = '/login';

export function login(params)  {
  return post(LOGIN, params);
}