import React from 'react';
import {  Routes, Route, Navigate } from 'react-router-dom';

import RulesSetting from '../pages/rules-setting';
import ActivityPoints from '../pages/activity-points';
import PromotionPoints from '../pages/promotion-points';

export default () => (
  // v6 将 <Redirect> 组件移除了
  <Routes>
    <Route path='/' element={<Navigate to='/rules-setting' replace />} /> 
    <Route path='/rules-setting' element={<RulesSetting />} />
    <Route path='/points-get' element={<Navigate to='/points-get/activity-points' replace />} />
    <Route path='/points-get/activity-points' element={<ActivityPoints />} />
    <Route path='/points-get/promotion-points' element={<PromotionPoints />} />
  </Routes>
);
