import { get, post } from '../utils/request';

const GET_ACTIVITY_LIST = '/points-setting/activ-list/get';
const DELETE_ACTIVITY = '/points-setting/activ/delete';
const SAVE_ACTIVITY = '/points-setting/activ/add';

export function saveActivity(params)  {
  return post(SAVE_ACTIVITY, params);
}

export function getActivityList()  {
  return get(GET_ACTIVITY_LIST);
}

export function deleteActiv(id)  {
  return get(DELETE_ACTIVITY + '/' + id);
}