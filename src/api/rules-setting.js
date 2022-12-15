import { post } from '../utils/request';
const SAVE_RULES_SETTING = '/rules-setting/save';

export function saveRulesSetting(params)  {
  return post(SAVE_RULES_SETTING, params);
}