import { SubText } from '@/components/Text/index';
import { Tip } from '@/components/Tip';
import services from '@/services/admin';
import {
  ProForm,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { Divider, Form, Typography, message } from 'antd';
import { useEffect, useState } from 'react';

export default () => {
  const [form] = Form.useForm();
  const [baseInfo, setBaseInfo] = useState<any>({});

  useEffect(() => {
    getBaseInfo();
  }, []);

  const getBaseInfo = async () => {
    try {
      let data = await services.SiteSecurityController.commonInfo();
      setBaseInfo(data);
      let info = { ...data };
      form.setFieldsValue(info);
    } catch (error) {}
  };

  return (
    <div>
      {/* <Tip
        title={'审核配置提示'}
        des={
          <>
            <div>
              依据相关法律法规应对用户输入的内容进行安全过滤之后再进行显示及相关操作，如果您禁用了一下文本安全检测方案，可能会导致违规言论或词汇出现在您的平台，继而您的平台可能会面临相关法律责任，请依据你的当地法律法规自行选择！（非调试测试环境建议不要禁用任何一项安全检测）
            </div>
          </>
        }
      ></Tip> */}
      <ProForm
        form={form}
        layout="vertical"
        onFinish={async (values) => {
          let info = { ...values };
          try {
            await services.SiteSecurityController.commonEdit(info);
            message.success('修改成功');
          } catch (error) {}
        }}
      >
        <ProFormSwitch
          name="stopInnerTxtCheck"
          label={
            <>
              禁用内置文本安全检测
              <SubText>
                禁用之后会导致用户输入的文本无法进行安全过滤，可能其内容包含违规词汇，请依据您的当地法律法规自行选择
              </SubText>
            </>
          }
        />
        <ProFormSwitch
          name="stopInnerMjCheck"
          label={
            <>
              禁用内置Midjourney屏蔽词过滤检测
              <SubText>
                禁用之后用户输入的内容可能包含Midjourney官方禁止的词汇，同时会增加您的账户封号概率
              </SubText>
            </>
          }
        />
        <ProFormSwitch
          name="stopCustomCheck"
          label={
            <>
              禁用自定义敏感词库
              {/* <SubText>默认为https://discord.com/api</SubText> */}
            </>
          }
        />

        {/* <div>
          <Divider plain>
            <Typography.Title level={5}>文本噪音处理</Typography.Title>
          </Divider>
          <ProFormSwitch
            name="cutSpecialSymbol"
            label={<>文本空格等噪音去除</>}
          />
          <ProFormText
            name="regex"
            label={
              <>
                文本噪音正则{' '}
                <SubText>
                  默认正则为 [\\|\\s%$&*@]+
                  ，请输入JAVA支持的正则表达式，否则会出现安全过滤失败的问题
                </SubText>
              </>
            }
            placeholder="请输入"
          />
        </div> */}
      </ProForm>
    </div>
  );
};
