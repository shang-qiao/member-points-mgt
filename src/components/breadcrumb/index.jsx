import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { useTranslation } from 'react-i18next';
// import Pubsub from 'pubsub-js';

export default () => {
  const { t } = useTranslation();
  const breadcrumbNameMap = {
    '/rules-setting': t('ruleSetting'),
    '/points-get': t('pointSetting'),
    '/points-get/activity-points': t('acitvityPoint'),
    '/points-get/promotion-points': t('promotionPoint'),
  };
  // 监听路由变化 ?
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const breadcrumbItems = pathSnippets.map((_, index) => {

    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        {/* <Link to={url}>{breadcrumbNameMap[url]}</Link> */}
        <span>{breadcrumbNameMap[url]}</span>
      </Breadcrumb.Item>
    );
  });
  // const path = breadcrumbItems[breadcrumbItems.length - 1]?.key;
  // Pubsub.publish('updateSelectedKey', path.slice(1));
  return (
    <Breadcrumb>{breadcrumbItems}</Breadcrumb>
  );
};
