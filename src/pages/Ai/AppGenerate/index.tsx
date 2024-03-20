import { Back } from '@/components/Back';
import { MarkdownRenderer } from '@/components/MarkDown';
import { ATag } from '@/components/Tag/ATag';
import services from '@/services/ai';
import { isLogin } from '@/utils';
import { getModeFormModeList } from '@/utils/format';
import { useLocation, useModel, useNavigate } from '@umijs/max';
import { Button, Card, Input, Space, message, theme } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { chatQuotaCheck } from '../../../utils/vali';
import useStyles from './index.module.style';
import { CaretRightOutlined } from '@ant-design/icons';

interface IAppDetail {
  id: number;
  name: string;
  isPublic: number;
  icon: string;
  description: string;
  placeholder: string;
  sort: number;
  submitTitle: string;
  prompt: string;
  categoryId: number;
  maxLength: number;
  model: string;
  temperature: number;
  presencePenalty: number;
  frequencyPenalty: number;
}

export default () => {
  const navigate = useNavigate();
  const { styles } = useStyles();
  const { token } = theme.useToken();
  const { modeList } = useModel('modes');
  const location = useLocation();
  const urlParams = useRef<any>();
  const [result, setResult] = useState<Partial<IAppDetail>>({});
  const [contentText, setContentText] = useState<string>('');
  const [textValue, setTextValue] = useState<string>('');
  const [generatLoading, setGeneratLoading] = useState<boolean>(false);

  useEffect(() => {
    urlParams.current = new URLSearchParams(location.search);
    getAppDetail();
  }, []);

  const getAppDetail = async () => {
    try {
      const data = await services.AppController.appInfo({
        id: urlParams.current.get('id'),
      });
      setResult(data);
    } catch (error) {}
  };

  const mode = useMemo(() => {
    return getModeFormModeList(modeList, result.model);
  }, [result.model]);

  return (
    <div className={styles.contanir}>
      <Card>
        <Back
          onClick={() => {
            navigate(-1);
          }}
        ></Back>
        <div className={styles.title}>
            {result.name}
        </div>
        <div className={styles.des}>
          <ATag type="default">{mode?.label}</ATag>
        </div>
        <div className={styles.des}>{result.description}</div>
        <div>
          <Input.TextArea
            rows={8}
            value={textValue}
            placeholder={result.placeholder}
            showCount
            maxLength={result.maxLength}
            onChange={(e) => {
              setTextValue(e.target.value);
            }}
          ></Input.TextArea>
        </div>
        <div className={styles.hanld}>
			<Space size={"large"}>
          <Button
            type="primary"
			icon={ <CaretRightOutlined />}
            disabled={!textValue}
            loading={generatLoading}
            onClick={async () => {
              if (!isLogin()) {
                message.error('请登录后使用');
                return;
              }
              if (!(await chatQuotaCheck(result?.model || ''))) {
                return;
              }
              setContentText('');
              setGeneratLoading(true);
              let completionResultText = '';
              await services.ChatController.completions(
                { appId: result.id, text: textValue },
                {
                  cb: (data) => {
                    completionResultText += data;
                    setContentText(`${completionResultText}`);
                  },
                  ctrlCb: () => {},
                  end: () => {
                    setGeneratLoading(false);
                  },
                },
              );
            }}
          >
        {result.submitTitle}
          </Button>
		   <Button  onClick={() => {
                localStorage.setItem('lastMenusKey', '1');
                navigate(`/ai/chat`, {
                  state: result,
                });
              }} >添至对话</Button>
		   </Space>
        </div>
      </Card>
      <Card style={{ marginTop: 8 }}>
        {contentText ? (
          <div className={styles.content}>
            {contentText ? (
              <MarkdownRenderer>{contentText}</MarkdownRenderer>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="la-ball-beat la-dark la-sm">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div style={{ visibility: 'hidden' }}>加载中</div>
              </div>
            )}
            <Button
              type="primary"
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(contentText);
                  message.success('复制成功');
                }
              }}
            >
              点击复制
            </Button>
          </div>
        ) : (
          <div className={styles.empty}>
            等待您的输入，点击「{result.submitTitle}」按钮开始吧！
          </div>
        )}
      </Card>
    </div>
  );
};
// style={{animation: "generateNewText .3s linear"}}
