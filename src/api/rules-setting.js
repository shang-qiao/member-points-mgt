import { get, post } from '../utils/request';

const SAVE_RULES_SETTING = '/rules-setting/save';
const GET_RULES_SETTING = '/rules-setting/get';

export function saveRulesSetting(params)  {
  return post(SAVE_RULES_SETTING, params);
}

export function getRulesSetting()  {
  return get(GET_RULES_SETTING);
}