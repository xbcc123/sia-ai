import { proxy, snapshot } from '@umijs/max';
import { ThemeProviderProps } from 'antd-style';
import { cloneDeep, merge } from 'lodash';

export type IThemeMode = 'auto' | 'dark' | 'light';
type IProvider = ThemeProviderProps<any, any>;

interface ICustomProviderProps {
  token?: any;
}

/**
 * @description: 初始化主题
 */
export const themeProvider = proxy<IProvider>({
  customToken: {},
  themeMode: 'light',
  theme: {
    token: {
      colorPrimary: '#7848f1',
      borderRadius: 8,
    },
    components: {
      Tag: {
        defaultBg: 'rgba(0, 0, 0, 0)',
      },
	  Form: {
		itemMarginBottom: 18
	  },
	  Slider: {
		controlHeight: 16
	  }
    },
  },
});

/**
 * @description: 改变主题
 * @param {boolean} info
 * @return {*}
 */
export const changeGlobalStyles = (info: {
  antdStyles: string;
  themeMode: IThemeMode;
}) => {
  const antdStyles = JSON.parse(info?.antdStyles || "{}");
  if (antdStyles) {
    // 改变全局token
    themeProvider.theme.token = merge(
      cloneDeep(snapshot(themeProvider.theme.token)),
      antdStyles.token,
    );
    // 改变全局 components
    themeProvider.theme.components = merge(
      cloneDeep(snapshot(themeProvider.theme.components)),
      antdStyles.components,
    );
  }
  // 改变全局 主题
  themeProvider.themeMode = localStorage.getItem('themeMode') || info?.themeMode || 'light';
};

/**
 * @description: 响应式主题变量处理
 * @param {boolean} mobile
 * @return {*}
 */
export const changeMobile = (mobile: boolean) => {
  themeProvider.customToken.headerHeight = mobile
    ? 'calc(100vh - 92px)'
    : 'calc(100vh - 40px)';
};

/**
 * @description: 暗黑主题
 * @param {ICustomProviderProps} param1
 * @return {*}
 */
export const customProviderDark = ({
  token,
}: ICustomProviderProps): IProvider => {
  return {
    customToken: {},
    theme: {
      token: {},
    },
  };
};

/**
 * @description: 亮色主题
 * @param {ICustomProviderProps} param1
 * @return {*}
 */
export const customProviderLight = ({
  token,
}: ICustomProviderProps): IProvider => {
  return {
    customToken: {},
    theme: {
      token: {},
    },
  };
};
