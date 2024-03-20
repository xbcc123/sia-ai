import { Tag, TagProps } from 'antd';
import { createStyles, useTheme } from 'antd-style';

const useStyles = createStyles(({ cx, css, token }, { type, pointer }: any) => {
  const isDefaultHover = !type && pointer;
  return {
    aTag: {
      display: 'inline',
      '&:hover': {
        color: isDefaultHover
          ? token.colorPrimaryHover + '!important'
          : 'initial',
        borderColor: isDefaultHover
          ? token.colorPrimaryHover + '!important'
          : 'initial',
      },
    },
  };
});

interface ITagProps extends TagProps {
  pointer?: boolean;
  type?: 'default' | 'sucess' | 'error';
}

export const ATag = ({
  children,
  type,
  style,
  pointer,
  ...rest
}: ITagProps) => {
  const token = useTheme();
  const { styles } = useStyles({ type, pointer });

  const cusStyleMap = {
    default: {
      color: token.colorPrimaryText,
      borderColor: token.colorPrimary,
      background: 'transparent',
    },
    sucess: {
      color: token.colorSuccessText,
      borderColor: token.colorSuccess,
      background: 'transparent',
    },
    error: {
      color: token.colorErrorText,
      borderColor: token.colorError,
      background: 'transparent',
    },
  };

  let cusStyle = type
    ? cusStyleMap[type]
    : {
        color: token.colorTextSecondary,
        borderColor: token.colorTextSecondary,
        background: 'transparent',
      };

  return (
  <Tag
      className={styles.aTag}
      style={{
        ...{ cursor: pointer ? 'pointer' : 'initial', marginRight: 0},
        ...cusStyle,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};
