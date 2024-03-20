import { useRef, useState } from 'react';
import useStyles from './index.module.style';
import { Modal } from 'antd';
import Sence from '../Sence';

export const SenceModal = ({open, onCancel, onClicked}: {open: boolean, onCancel: () => void, onClicked: (item: any) => void}) => {
  const { styles } = useStyles();
  return (<Modal footer={[]} styles={{
	body: {
		marginTop: 24,
		height: 600,
		overflow: 'auto'
	}
  }} width={1000} open={open} onCancel={onCancel}>
	<Sence onClicked={onClicked}></Sence>
  </Modal>);
};
