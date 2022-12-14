import React, { Component } from 'react';
import { Radio, Input, Button, Typography } from 'antd';
import './index.scss';
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

  submit = () => {
    console.log(this.state);
  };

  render() {
    const { Link } = Typography;
    return (
      <div>
        <div className='header'>
          <div className='title'>请设置具体会员积分规则</div>
        </div>
        <div className='content'>
          <div className='item'>
            <div className='title'>生效设置</div>
            <Radio.Group
              className='radio'
              onChange={this.onValueChange('isEnabled')}
              value={this.state.isEnabled}
            >
              <Radio value={1}>确认收货立即生效</Radio>
              <Radio value={2}>
                <div className='label-group'>
                  <span className='label-left'>确认收货后</span>
                  <Input
                    onChange={this.onValueChange('enableHours')}
                    value={this.state.enableHours}
                    placeholder='24'
                  />
                  <span className='label-right'>小时内生效</span>
                </div>
              </Radio>
            </Radio.Group>
          </div>

          <div className='item'>
            <div className='title'>到期设置</div>
            <Radio.Group
              className='radio'
              onChange={this.onValueChange('isExpire')}
              value={this.state.isExpire}
            >
              <Radio value={1}>永久有效</Radio>
              <Radio value={2}>
                <div className='label-group'>
                  <span className='label-left'>每</span>
                  <Input
                    onChange={this.onValueChange('expireDays')}
                    value={this.state.expireDays}
                    placeholder='365'
                  />
                  <span className='label-right'>天清除积分池所有积分</span>
                </div>
              </Radio>
            </Radio.Group>
          </div>

          <div className='item'>
            <div className='title'>到期提醒设置</div>
            <Radio.Group
              className='radio'
              onChange={this.onValueChange('isRemind')}
              value={this.state.isRemind}
            >
              <Radio value={1}>不提醒</Radio>
              <Radio value={2}>提醒</Radio>
              <Link>提醒设置</Link>
            </Radio.Group>
          </div>

          <div className='item'>
            <div className='title'>订单积分计算规则设置</div>
            <div className='wrap'>
              <div className='label-group'>
                <span className='label-left'>订单实付金额满</span>
                <Input
                  onChange={this.onValueChange('standardMoney', 'pointsRules')}
                  value={this.state.pointsRules.standardMoney}
                  placeholder='0'
                />
                <span className='label-right'>元时，</span>
              </div>
              <div className='label-group'>
                <span className='label-left'>每消费</span>
                <Input
                  onChange={this.onValueChange('paidMondy', 'pointsRules')}
                  value={this.state.pointsRules.paidMondy}
                  placeholder='0'
                />
                <span className='label-right'>元，</span>
              </div>
              <div className='label-group'>
                <span className='label-left'>获得</span>
                <Input
                  onChange={this.onValueChange('getPoints', 'pointsRules')}
                  value={this.state.pointsRules.getPoints}
                  placeholder='0'
                />
                <span className='label-right'>积分；</span>
              </div>
              <div className='label-group'>
                <span className='label-left'>每笔订单最高的</span>
                <Input
                  onChange={this.onValueChange('maxPoints', 'pointsRules')}
                  value={this.state.pointsRules.maxPoints}
                  placeholder='0'
                />
                <span className='label-right'>积分。</span>
              </div>
            </div>
          </div>

          <div className='item'>
            <div className='title'>积分抵扣设置</div>
            <Radio.Group
              className='radio'
              onChange={this.onValueChange('isDeduction')}
              value={this.state.isDeduction}
            >
              <Radio value={1}>不可抵扣</Radio>
              <Radio value={2}>可抵扣</Radio>
              <Link>抵扣设置</Link>
            </Radio.Group>
          </div>
        </div>

        <div className='footer'>
          <div className='btn-group'>
            <Button type='primary' size='large' onClick={this.submit}>
              确定
            </Button>
            <Button type='default' size='large'>
              取消
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
