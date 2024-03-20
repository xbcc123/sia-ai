import {InfoCircleOutlined} from '@ant-design/icons';
import {Modal, Segmented, theme} from 'antd';
import {createStyles} from 'antd-style';
import {useState} from 'react';

const boyAvaList = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8'];
const girlAvaList = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8'];

export const AvaModal = ({avaModalVisible, setAvaModalVisible, editUserInfo}: {avaModalVisible: boolean, setAvaModalVisible: any, editUserInfo: any}) => {
	const { styles } = useStyles();
	const [avaSegmented, setAvaSegmented] = useState('boy');
	const { token } = theme.useToken();

	return   <Modal
	open={avaModalVisible}
	width={460}
	footer={[]}
	title={
	  <>
		<InfoCircleOutlined
		  style={{
			color: token.colorPrimary,
			marginRight: 8
		  }}
		/>
		选择头像
	  </>
	}
	onCancel={() => setAvaModalVisible(false)}
  >
	<Segmented
	  style={{ marginBottom: 16 }}
	  onChange={(e) => setAvaSegmented(e as any)}
	  value={avaSegmented}
	  options={[
		{
		  label: '男生',
		  value: 'boy',
		},
		{
		  label: '女生',
		  value: 'girl',
		},
	  ]}
	/>

	<div className={styles.avaContent}>
	  {avaSegmented === 'boy' &&
		boyAvaList?.map((item, index) => {
		  return (
			<img
			  src={require(`@/assets/images/ava/${item}.png`)}
			  alt=""
			  key={index}
			  onClick={() => {
				editUserInfo({ avatar: item });
				setAvaModalVisible(false);
			  }}
			/>
		  );
		})}
	  {avaSegmented === 'girl' &&
		girlAvaList?.map((item, index) => {
		  return (
			<img
			  src={require(`@/assets/images/ava/${item}.png`)}
			  alt=""
			  key={index}
			  onClick={() => {
				editUserInfo({ avatar: item });
				setAvaModalVisible(false);
			  }}
			/>
		  );
		})}
	</div>
  </Modal>
}


const useStyles = createStyles(({token}) => {
	return {
	  container: {
		flex: '1',
	  },
	  avatarIcon: {
		marginRight: '8px',
		marginBottom: '8px',
		fontSize: '18px',
	  },
	  avaContent: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: '16px',
		'& > img': {
		  display: 'inline-block',
		  cursor: 'pointer',
		  background: '#CCCCCC',
		  width: '90px',
		  height: '90px',
		  borderRadius: token.borderRadius,
		  '&:hover': {
			opacity: '0.8',
		  },
		},
	  },
	};
  });