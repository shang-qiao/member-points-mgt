import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/login';
import RulesSetting from '../pages/rules-setting';
import ActivityPoints from '../pages/activity-points';
import PromotionPoints from '../pages/promotion-points';
import Home from '../components/home';
import { AuthRoute } from '../utils/AuthRoute';

export default () => (
  // v6 将 <Redirect> 组件移除了
  <Routes>
    <Route path='/' element={<Navigate to='/rules-setting' replace />} />
    <Route path='/login' element={<Login />} />
    <Route
      path='/rules-setting'
      element={
        <AuthRoute>
          <Home childElement={<RulesSetting />}> </Home>
        </AuthRoute>
      }
    />
    <Route
      path='/points-get'
      element={<Navigate to='/points-get/activity-points' replace />}
    ></Route>
    <Route
      path='/points-get/activity-points'
      element={
        <AuthRoute>
          <Home childElement={<ActivityPoints />}> </Home>
        </AuthRoute>
      }
    />
    <Route
      path='/points-get/promotion-points'
      element={
        <AuthRoute>
          <Home childElement={<PromotionPoints />}> </Home>
        </AuthRoute>
      }
    />
  </Routes>
);
