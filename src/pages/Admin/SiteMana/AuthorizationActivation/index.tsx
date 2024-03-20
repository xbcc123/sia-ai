import { Card, Tabs, TabsProps } from 'antd';
import { useState } from 'react';
import BaseSet from './components/BaseSet';
// import ImgSet from './components/ImgSet';
// import ProxySet from './components/ProxySet';
// import Consume from './components/Consume';

export default () => {
  const [value, setValue] = useState('1');

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '用户协议',
      children: <BaseSet></BaseSet>,
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
