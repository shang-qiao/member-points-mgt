import React, { Component } from 'react';
import { Radio, Input, Button, Typography, Spin, message } from 'antd';
import { saveRulesSetting, getRulesSetting } from '../../api/rules-setting';
import styles from './index.module.scss';
import { withTranslation } from 'react-i18next';

class RulesSetting extends Component {
  constructor(props) {
    super(props);
    this.t = props.t;
    this.state = {
      isEnabled: 2,
      enableHours: 0,
      isExpire: 2,
      expireDays: 0,
      isRemind: 2,
      pointsRules: {
        standardMoney: 0,
        paidMondy: 0,
        getPoints: 0,
        maxPoints: 0,
      },
      isDeduction: 2,
      inputDisabled: false,
      isLoading: false,
    };
  }

  // 函数柯里化方式接受函数
  onValueChange = (key, obj) => {
    return (e) => {
      let state = null;
      if (obj) {
        delete this.state[obj][key];
        state = {
          [obj]: {
            ...this.state[obj],
            [key]: e.target.value,
          },
        };
      } else {
        state = {
          [key]: e.target.value,
        };
      }
      this.setState(state, () => {
        // 状态更新完毕,界面也更新后(render调用后)才被调用
        // console.log(this.state);
      });
    };
  };

  showLoading = (isLoading) => {
    this.setState({
      isLoading,
    });
  };

  submit = async() => {
    this.showLoading(true);
    const { data: res } = await saveRulesSetting(this.state);
    this.showLoading(false);
    if (res.code === 200) {
      this.getRulesSetting();
      message.success(this.t('ruleSetting.setSaveSuccess'), 1);
    } else {
      message.error(this.t('ruleSetting.setSaveFailed'), 1);
    }
  };

  getRulesSetting = async() => {
    this.showLoading(true);
    const { data: res } = await getRulesSetting();
    this.showLoading(false);
    if (res.code === 200) {
      // 数据回显
      console.log(res);
      this.setState(res.data);
    } else {
      message.error(this.t('ruleSetting.setQueryFailed'), 1);
    }
  };

  componentDidMount() {
    this.getRulesSetting();
  }

  render() {
    const { Link } = Typography;
    return (
      <Spin spinning={this.state.isLoading}>
        <div>
          <div className={styles.header}>
            <div className={styles.title}>{this.t('ruleSetting.title')}</div>
          </div>
          <div className={styles.content}>
            <div className={styles.item}>
              <div className={styles.title}>
                {this.t('ruleSetting.effectSet')}
              </div>
              <Radio.Group
                className={styles.radio}
                onChange={this.onValueChange('isEnabled')}
                value={this.state.isEnabled}
              >
                <Radio value={1}>
                  {this.t('ruleSetting.receiveGoodsEffect')}
                </Radio>
                <Radio value={2}>
                  <div className={styles.label_group}>
                    <span className={styles.label_left}>
                      {this.t('ruleSetting.afterReceiveGoods')}
                    </span>
                    <Input
                      disabled={this.state.isEnabled === 1}
                      onChange={this.onValueChange('enableHours')}
                      value={this.state.enableHours}
                      placeholder='24'
                    />
                    <span className={styles.label_right}>
                      {this.t('ruleSetting.effectInHour')}
                    </span>
                  </div>
                </Radio>
              </Radio.Group>
            </div>

            <div className={styles.item}>
              <div className={styles.title}>
                {this.t('ruleSetting.expireSet')}
              </div>
              <Radio.Group
                className={styles.radio}
                onChange={this.onValueChange('isExpire')}
                value={this.state.isExpire}
              >
                <Radio value={1}>{this.t('ruleSetting.expireSet')}</Radio>
                <Radio value={2}>
                  <div className={styles.label_group}>
                    <span className={styles.label_left}>
                      {this.t('ruleSetting.permanentValidity')}
                    </span>
                    <Input
                      disabled={this.state.isExpire === 1}
                      onChange={this.onValueChange('expireDays')}
                      value={this.state.expireDays}
                      placeholder='365'
                    />
                    <span className={styles.label_right}>
                      {this.t('ruleSetting.per')}
                    </span>
                  </div>
                </Radio>
              </Radio.Group>
            </div>

            <div className={styles.item}>
              <div className={styles.title}>
                {this.t('ruleSetting.expirationReminderSet')}
              </div>
              <Radio.Group
                className={styles.radio}
                onChange={this.onValueChange('isRemind')}
                value={this.state.isRemind}
              >
                <Radio value={1}>{this.t('ruleSetting.noPrompt')}</Radio>
                <Radio value={2}>{this.t('ruleSetting.prompt')}</Radio>
                <Link>{this.t('ruleSetting.promptSet')}</Link>
              </Radio.Group>
            </div>

            <div className={styles.item}>
              <div className={styles.title}>
                {this.t('ruleSetting.pointsRuleSet')}
              </div>
              <div className={styles.wrap}>
                <div className={styles.label_group}>
                  <span className={styles.label_left}>
                    {this.t('ruleSetting.spentMoney')}
                  </span>
                  <Input
                    onChange={this.onValueChange(
                      'standardMoney',
                      'pointsRules'
                    )}
                    value={this.state.pointsRules.standardMoney}
                    placeholder='0'
                  />
                  <span className={styles.label_right}>
                    {this.t('ruleSetting.yuan') + ','}
                  </span>
                </div>
                <div className={styles.label_group}>
                  <span className={styles.label_left}>
                    {this.t('ruleSetting.perSpent')}
                  </span>
                  <Input
                    onChange={this.onValueChange('paidMondy', 'pointsRules')}
                    value={this.state.pointsRules.paidMondy}
                    placeholder='0'
                  />
                  <span className={styles.label_right}>
                    {this.t('ruleSetting.yuan') + ','}
                  </span>
                </div>
                <div className={styles.label_group}>
                  <span className={styles.label_left}>
                    {this.t('ruleSetting.get')}
                  </span>
                  <Input
                    onChange={this.onValueChange('getPoints', 'pointsRules')}
                    value={this.state.pointsRules.getPoints}
                    placeholder='0'
                  />
                  <span className={styles.label_right}>
                    {this.t('ruleSetting.points')}；
                  </span>
                </div>
                <div className={styles.label_group}>
                  <span className={styles.label_left}>
                    {this.t('ruleSetting.theHighestPerOrder')}
                  </span>
                  <Input
                    onChange={this.onValueChange('maxPoints', 'pointsRules')}
                    value={this.state.pointsRules.maxPoints}
                    placeholder='0'
                  />
                  <span className={styles.label_right}>
                    {this.t('ruleSetting.points')}。
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.item}>
              <div className={styles.title}>
                {this.t('ruleSetting.deductibleSet')}
              </div>
              <Radio.Group
                className={styles.radio}
                onChange={this.onValueChange('isDeduction')}
                value={this.state.isDeduction}
              >
                <Radio value={1}>{this.t('ruleSetting.non-deductible')}</Radio>
                <Radio value={2}>{this.t('ruleSetting.deductible')}</Radio>
                <Link>{this.t('ruleSetting.deductibleSet')}</Link>
              </Radio.Group>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.btn_group}>
              <Button type='primary' size='large' onClick={this.submit}>
                {this.t('confirm')}
              </Button>
              <Button type='default' size='large'>
                {this.t('cancel')}
              </Button>
            </div>
          </div>
        </div>
      </Spin>
    );
  }
}

export default withTranslation()(RulesSetting);
