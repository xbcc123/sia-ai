import { CaretRightOutlined, CopyOutlined } from '@ant-design/icons';
import { Button, Collapse, List, Modal, message } from 'antd';
import { useResponsive, useTheme } from 'antd-style';
import { uniqBy } from 'lodash';
import { CSSProperties, ReactNode, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { ImessageType } from '../../pages/Ai/Chat/components/ChatContentListWrap/index';
import { ATag } from '../Tag/ATag';

export const MarkdownRenderer = (props: any) => {
  const { mobile } = useResponsive();
  const maxWidth = mobile
    ? window.outerWidth - 40 * window.devicePixelRatio
    : 800;
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '') || [
            'language-javascript',
          ];
          return !inline && match ? (
            <MarkDownCode
              maxWidth={maxWidth}
              match={match}
              children={children}
              props={props}
            ></MarkDownCode>
          ) : (
            <code
              {...props}
              style={{
                maxWidth,
              }}
              className={className}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {props.children}
      {/* {markdown} */}
    </ReactMarkdown>
  );
};

// 代码样式
const MarkDownCode = ({
  maxWidth,
  match,
  children,
  props,
}: {
  maxWidth: number;
  match: any[];
  children: ReactNode;
  props: any;
}) => {
  const token = useTheme();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#414349',
        maxWidth,
        borderRadius: token.borderRadius,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0px 8px',
          marginTop: 8,
          color: '#eee',
        }}
      >
        <div style={{ fontSize: 12 }}>{match[0]?.slice?.(9) || ''}</div>
        <CopyToClipboard
          text={children}
          onCopy={() => {
            message.success('代码复制成功');
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'flex-end',
              cursor: 'pointer',
              padding: 4,
            }}
          >
            <CopyOutlined />
          </div>
        </CopyToClipboard>
      </div>
      <SyntaxHighlighter
        {...props}
        children={String(children).replace(/\n$/, '')}
        style={oneDark}
        language={match[1]}
        PreTag="div"
      />
    </div>
  );
};

export const MessageRender = ({ item }: { item: Partial<ImessageType> }) => {
  return (
    <>
      <MarkdownRenderer>{item.text}</MarkdownRenderer>
	  {
		item?.finish && <DocumentLink item={item}></DocumentLink>
	  }
    </>
  );
};

// 文档引用样式
const DocumentLink = ({ item }: { item: Partial<ImessageType> }) => {
  const token = useTheme();
  const [documentModalOpen, setDocumentModalOpen] = useState<boolean>(false);

  const panelStyle: CSSProperties = {
    marginBottom: 8,
    background: token.colorFillAlter,
    borderRadius: token.borderRadius,
    border: 'none',
  };

  let documents = item?.documents?.length ? item?.documents : [];
  if (documents?.length) {
    documents = uniqBy(documents, 'docId');
  }
  return documents?.length > 0 ? (
    <div>
      <div
        style={{
          color: token?.colorTextTertiary,
          fontSize: 12,
          marginBottom: 6,
          cursor: 'pointer',
        }}
        onClick={() => {
          setDocumentModalOpen(true);
        }}
      >
        <div
          style={{ marginBottom: 2, padding: '0px 4px', fontWeight: 'bolder' }}
        >
          文档来源
        </div>
        {documents?.map?.((documentItem, documentIndex) => {
          return (
            <div
              style={{ padding: '0px 4px', paddingLeft: 16 }}
              key={documentIndex}
            >
              {documentItem.title}：
              <span
                style={{ color: token?.colorPrimaryText, fontSize: 12}}
              >
                {documentItem?.nodes?.length}
              </span>
              条
            </div>
          );
        })}
      </div>
      <Modal
        width={1000}
        footer={[]}
		title="数据来源"
        open={documentModalOpen}
		styles={{
			body: {
				height: 600,
				overflow: 'auto'
			}
		}}
        onCancel={() => {
          setDocumentModalOpen(false);
        }}
      >
        <Collapse
          bordered={false}
          defaultActiveKey={documents?.map?.((document) => document.docId)}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{ background: token.colorBgContainer }}
          items={documents?.map?.((documentItem) => {
            return {
              key: documentItem.docId,
              label: <div>{documentItem.title} <ATag style={{marginLeft: 4}}>{documentItem?.nodes?.length}条</ATag> </div>,
              children: (
                <List
                  size="small"
                  dataSource={documentItem?.nodes}
                  renderItem={(item) => <List.Item style={{fontSize: 12}}>相似度：{item?.score} <br/> 内容：{item?.text}</List.Item>}
                />
              ),
              style: panelStyle,
            };
          })}
        />
      </Modal>
    </div>
  ) : (
    <></>
  );
};
