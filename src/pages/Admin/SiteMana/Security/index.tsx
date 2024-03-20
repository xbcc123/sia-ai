import { Card, Tabs, TabsProps } from 'antd';
import { useState } from 'react';
import BaseSet from './components/BaseSet';
import ThirdParty from './components/ThirdParty';
import Word from './components/Word';

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
		label: '第三方平台',
		children: <ThirdParty></ThirdParty>,
	  },
	  {
		key: '3',
		label: ' 敏感词管理',
		children: <Word></Word>,
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
