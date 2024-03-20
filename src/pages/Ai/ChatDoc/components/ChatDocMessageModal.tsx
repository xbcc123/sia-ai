import { Modal } from 'antd';
import { ChatContentListWrap } from '../../Chat/components/ChatContentListWrap/index';
import { useEffect } from 'react';

export const ChatDocMessageModal = ({
  open,
  detail,
  onCancel,
}: {
  open: boolean;
  detail: any;
  onCancel: () => void;
}) => {

  return (
    <Modal open={open} width={1000} footer={[]} styles={{
		content: {
			padding: "0px 16px 10px 16px"
		},
		body: {
			height: 600,
			overflow: 'auto'
		},
	}} onCancel={onCancel}>
      <ChatContentListWrap
	    key={detail?.id}
	  	type='chatDoc'
        configItem={{
			title: detail?.libraryName,
			...detail
		}}
		style={{
			padding: 0,
			paddingTop: 42,
			height: 600
		}}
		textAreaProps={{
			rows: 3,
		  }}
      ></ChatContentListWrap>
    </Modal>
  );
};
