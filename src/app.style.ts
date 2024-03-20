import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    '.ant-pro-layout .ant-layout-header.ant-pro-layout-header': {
      borderBottom: '1px solid #eee',
    },
    '.ant-pro-layout .ant-pro-layout-content-has-page-container': {
      background: 'linear-gradient(180deg,  #3d005675, transparent)',
    },
    '.ant-pro-layout .ant-pro-layout-content': {
      padding: '0',
    },
    '.ant-pro-top-nav-header-main': {
      padding: '0 24px',
    },
    textEllipsis: {
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: '3',
    },
    singleLine: {
      whiteSpace: 'nowrap',
    },
  };
});
export default useStyles;
