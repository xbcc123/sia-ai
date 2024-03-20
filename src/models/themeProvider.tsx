import { ThemeProviderProps, useResponsive, useTheme } from 'antd-style';
import { merge } from 'lodash';
import { useState } from 'react';

export type IThemeMode = 'auto' | 'dark' | 'light';
type IProvider = ThemeProviderProps<any, any>;
export default () => {
  const { mobile } = useResponsive();
  const token = useTheme();
  const [themeProvider, setThemeProvider] = useState<IProvider>(() => {
    let themeMode: IThemeMode = 'dark';
    let provider: IProvider = {
      customToken: {
        headerHeight: mobile ? 'calc(100vh - 92px)' : 'calc(100vh - 40px)',
      },
      themeMode,
      theme: {
        token: {
          colorPrimary: '#7848F1',
          borderRadius: 2,
        },
        components: {
          Tag: {
            defaultBg: 'rgba(0, 0, 0, 0)',
          },
		  Form: {
			itemMarginBottom: 12
		  }
        },
      },
      onThemeModeChange: (e) => {
        themeProvider.themeMode = e;
        setThemeProvider(themeProvider);
      },
    };
    if (provider.themeMode === 'dark') {
      provider = merge(provider, customProviderDark({ token }));
    } else if (provider.themeMode === 'light') {
      provider = merge(provider, customProviderLight({ token }));
    }
    return provider;
  });
  
  return { themeProvider, setThemeProvider };
};

interface ICustomProviderProps {
  token?: any;
}

const customProviderDark = ({ token }: ICustomProviderProps): IProvider => {
  return {
    customToken: {},
    theme: {
      token: {},
    },
  };
};

const customProviderLight = ({ token }: ICustomProviderProps): IProvider => {
  return {
    customToken: {},
    theme: {
      token: {},
    },
  };
};
