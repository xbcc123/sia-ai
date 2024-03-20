import { Card, Tabs, TabsProps } from 'antd';
import { useState } from 'react';
import BaseSet from './components/BaseSet';
import ModelSet from './components/ModelSet';
import ModelCus from './components/ModelCus';
import DefSet from './components/DefSet';

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
      label: '模型配置',
      children: <ModelSet></ModelSet>,
    },
    // {
    //   key: '3',
    //   label: '自定义模型',
    //   children: <ModelCus></ModelCus>,
    // },
    // {
    //   key: '4',
    //   label: '默认预设',
    //   children: <DefSet></DefSet>,
    // },
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
