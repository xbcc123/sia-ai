import { Card, Tabs, TabsProps } from 'antd';
import { useState } from 'react';
import BaseSet from './components/BaseSet';
import LoginAuth from './components/LoginAuth';
import EmailAndMsg from './components/EmailAndMsg';
import Pay from './components/Pay';
import Invite from './components/Invite';
import Prompt from './components/Prompt';
import Notice from './components/Notice';
import Script from './components/Script';
import AiToolsSet from './components/AiToolsSet';

export default () => {
  const [value, setValue] = useState('1');

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '基础设置',
      children: <BaseSet></BaseSet>,
    },
    {
      key: '2',
      label: '登录授权',
      children: <LoginAuth></LoginAuth>,
    },
	{
		key: '4',
		label: '产品支付',
		children: <Pay></Pay>,
	  },
    {
      key: '3',
      label: '邮箱及短信',
      children: <EmailAndMsg></EmailAndMsg>,
    },
    {
      key: '5',
      label: '注册邀请',
      children: <Invite></Invite>,
    },
    {
      key: '7',
      label: '公告通知',
      children: <Notice></Notice>,
    },
	{
		key: '6',
		label: '提示信息',
		children: <Prompt></Prompt>,
	  },
    {
      key: '8',
      label: '主题配置',
      children: <Script></Script>,
    },
	{
		key: '9',
		label: 'Ai工具配置',
		children: <AiToolsSet></AiToolsSet>,
	  },
  ];

  const onChange = (key: string) => {
    setValue(key);
  };

  return (
    <div>
      <Card size="small">
        <Tabs activeKey={value} items={items} onChange={onChange} />
      </Card>
    </div>
  );
};
