import React, { Component } from 'react';
import { Radio, Input, Button, Typography, Spin, message } from 'antd';
import { saveRulesSetting, getRulesSetting } from '../../api/rules-setting';
import styles from './index.module.scss';

export default class RulesSetting extends Component {
  constructor(props) {
    super(props);
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
      isLoading: false
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
      isLoading
    });
  };

  submit = async() => {
    this.showLoading(true);
    const { data: res } = await saveRulesSetting(this.state);
    this.showLoading(false);
    if (res.code === 200) {
      this.getRulesSetting();
      message.success('设置保存成功', 1);
    } else {
      message.error('设置保存失败', 1);
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
      message.error('设置查询失败', 1);
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
            <div className={styles.title}>请设置具体会员积分规则</div>
          </div>
          <div className={styles.content}>
            <div className={styles.item}>
              <div className={styles.title}>生效设置</div>
              <Radio.Group
                className={styles.radio}
                onChange={this.onValueChange('isEnabled')}
                value={this.state.isEnabled}
              >
                <Radio value={1}>确认收货立即生效</Radio>
                <Radio value={2}>
                  <div className={styles.label_group}>
                    <span className={styles.label_left}>确认收货后</span>
                    <Input
                      disabled={ this.state.isEnabled === 1 }
                      onChange={this.onValueChange('enableHours')}
                      value={this.state.enableHours}
                      placeholder='24'
                    />
                    <span className={styles.label_right}>小时内生效</span>
                  </div>
                </Radio>
              </Radio.Group>
            </div>

            <div className={styles.item}>
              <div className={styles.title}>到期设置</div>
              <Radio.Group
                className={styles.radio}
                onChange={this.onValueChange('isExpire')}
                value={this.state.isExpire}
              >
                <Radio value={1}>永久有效</Radio>
                <Radio value={2}>
                  <div className={styles.label_group}>
                    <span className={styles.label_left}>每</span>
                    <Input
                      disabled={ this.state.isExpire === 1 }
                      onChange={this.onValueChange('expireDays')}
                      value={this.state.expireDays}
                      placeholder='365'
                    />
                    <span className={styles.label_right}>天清除积分池所有积分</span>
                  </div>
                </Radio>
              </Radio.Group>
            </div>

            <div className={styles.item}>
              <div className={styles.title}>到期提醒设置</div>
              <Radio.Group
                className={styles.radio}
                onChange={this.onValueChange('isRemind')}
                value={this.state.isRemind}
              >
                <Radio value={1}>不提醒</Radio>
                <Radio value={2}>提醒</Radio>
                <Link>提醒设置</Link>
              </Radio.Group>
            </div>

            <div className={styles.item}>
              <div className={styles.title}>订单积分计算规则设置</div>
              <div className={styles.wrap}>
                <div className={styles.label_group}>
                  <span className={styles.label_left}>订单实付金额满</span>
                  <Input
                    onChange={this.onValueChange('standardMoney', 'pointsRules')}
                    value={this.state.pointsRules.standardMoney}
                    placeholder='0'
                  />
                  <span className={styles.label_right}>元时，</span>
                </div>
                <div className={styles.label_group}>
                  <span className={styles.label_left}>每消费</span>
                  <Input
                    onChange={this.onValueChange('paidMondy', 'pointsRules')}
                    value={this.state.pointsRules.paidMondy}
                    placeholder='0'
                  />
                  <span className={styles.label_right}>元，</span>
                </div>
                <div className={styles.label_group}>
                  <span className={styles.label_left}>获得</span>
                  <Input
                    onChange={this.onValueChange('getPoints', 'pointsRules')}
                    value={this.state.pointsRules.getPoints}
                    placeholder='0'
                  />
                  <span className={styles.label_right}>积分；</span>
                </div>
                <div className={styles.label_group}>
                  <span className={styles.label_left}>每笔订单最高的</span>
                  <Input
                    onChange={this.onValueChange('maxPoints', 'pointsRules')}
                    value={this.state.pointsRules.maxPoints}
                    placeholder='0'
                  />
                  <span className={styles.label_right}>积分。</span>
                </div>
              </div>
            </div>

            <div className={styles.item}>
              <div className={styles.title}>积分抵扣设置</div>
              <Radio.Group
                className={styles.radio}
                onChange={this.onValueChange('isDeduction')}
                value={this.state.isDeduction}
              >
                <Radio value={1}>不可抵扣</Radio>
                <Radio value={2}>可抵扣</Radio>
                <Link>抵扣设置</Link>
              </Radio.Group>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.btn_group}>
              <Button type='primary' size='large' onClick={this.submit}>
                确定
              </Button>
              <Button type='default' size='large'>
                取消
              </Button>
            </div>
          </div>
        </div>
      </Spin>
    );
  }
}
