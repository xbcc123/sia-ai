import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => {
  return {
    contanir: {
      position: "fixed",
      bottom: "0",
      zIndex: "999",
      display: "flex",
      width: "100%",
      background: token.colorBgBase,
      borderRight: `1px solid ${token.colorBorder}`,
    },
    proItem: {
      flex: "1",
      height: 52,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      cursor: "pointer",
      color: token.colorTextBase,
      background: token.colorBgBase,
      fontWeight: "500",
      ":hover": { color: token.colorPrimary },
    },
    proItemActive: {
      color: token.colorPrimary,
    },
    word: {
      fontSize: "12px",
      color: token.colorTextBase,
      transform: "scale(.9)",
    },
  };
});

export default useStyles;
