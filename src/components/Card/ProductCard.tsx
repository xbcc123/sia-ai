import { Divider } from 'antd';
import useStyles from './ProductCard.style';
import classnames from 'classnames';

export const ProductCard = ({
  classNameExtra,
  onClick,
  title,
  subTitle,
  content,
  animationDelay = '0s',
}: {
  classNameExtra: string;
  title: string | React.ReactNode;
  subTitle: string | React.ReactNode;
  content: string | React.ReactNode;
  animationDelay: string;
  onClick?: () => void;
}) => {
  const { styles } = useStyles();
  return (
    <div
      style={{ animationDelay }}
      onClick={onClick}
      className={classnames(
        styles.productCard,
        styles[`${classNameExtra}`],
        'animate__animated',
        'animate__fadeInLeft',
      )}
    >
      <div className={styles.top}>
        {title}
        <span className={styles.subTitle}>{subTitle}</span>
      </div>
      <Divider style={{ marginTop: 8, marginBottom: 0 }} />
      <div className={styles.bottom}>{content}</div>
    </div>
  );
};
