import { Card, Tabs, TabsProps } from 'antd';
import { useState } from 'react';
import BaseSet from './components/BaseSet';
import ImgSet from './components/ImgSet';
import ProxySet from './components/ProxySet';
import Consume from './components/Consume';

export default () => {
  const [value, setValue] = useState('1');

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '基础设置',
      children: <BaseSet></BaseSet>,
    },
    // {
    //   key: '2',
    //   label: '图片展示方案',
    //   children: <ImgSet></ImgSet>,
    // },
    // {
    //   key: '3',
    //   label: '代理设置',
    //   children: <ProxySet></ProxySet>,
    // },
    {
      key: '4',
      label: '模型消耗',
      children: <Consume></Consume>,
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
