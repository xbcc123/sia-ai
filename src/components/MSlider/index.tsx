import { CSSProperties, ReactNode, useEffect, useState } from 'react';
import useStyles from './index.module.style';
import { CusIcon } from '../Icon';
import { useResponsive } from 'antd-style';

export const MSlider = ({
  children,
  width,
  bodyStyle,
  defCollapsed = false,
}: {
  children?: ReactNode;
  width: string | number;
  bodyStyle?: CSSProperties;
  defCollapsed?: boolean;
}) => {
  const responsive = useResponsive()
  const { styles } = useStyles({responsive});
  const [collapsed, setCollapsed] = useState<boolean>(defCollapsed);
  
  useEffect(() => {
	setTimeout(() => {
		setCollapsed(defCollapsed)
	}, 500)
  }, [ defCollapsed])

  return (
    <div className={styles.slider}>
      <div
        className={styles.mask}
        style={collapsed ? {} : { display: 'none' }}
      ></div>
      <div
        className={`${styles.collapsedIcon}`}
		style={responsive?.mobile ? {} : { display: 'none' }}
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        {collapsed ? <CusIcon icon={'fa-solid fa-angles-left'} /> : <CusIcon icon={'fa-solid fa-angles-right'} />}
      </div>
      <div
        style={{ width: collapsed ? width : 0 }}
        className={`${styles.contanir} ${
          !collapsed ? styles.contanirActive : ''
        }`}
      >
        <div className={styles.content} style={bodyStyle}>
          {children}
        </div>
      </div>
    </div>
  );
};
