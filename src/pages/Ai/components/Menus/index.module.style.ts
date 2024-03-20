import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => {
  return {
    contanir: {
      display: "flex",
      alignItems: "center",
      background: token.colorBgBase,
	  gap: 8
    },
    proItem: {
	 padding: "0 8px",
      borderRadius: token.borderRadius,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: token.colorTextBase,
      fontWeight: "500",
      ":hover": { color: token.colorPrimaryTextActive, background: token.colorPrimaryBgHover},
    },
    proItemActive: {
      color: token.colorPrimaryTextActive,
      background: token.colorPrimaryBgHover,
    },
    word: {
	  marginLeft: 6,
      fontSize: "12px",
      transform: "scale(.9)",
    },
  };
});

export default useStyles;
