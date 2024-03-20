import { themeProvider } from '@/valtioStore';
import { changeMobile } from '@/valtioStore/index';
import { useSnapshot } from '@umijs/max';
import { ThemeProvider, useResponsive } from 'antd-style';
import { ReactNode, useEffect } from 'react';
import { BindModal } from '../Modal/BindModal';

export const ThemeProviderGlobal = ({ children }: { children: ReactNode }) => {
  const { mobile } = useResponsive();
  let provider = useSnapshot(themeProvider);

  useEffect(() => {
    if (mobile !== undefined) {
      changeMobile(mobile);
    }
  }, [mobile]);

  return (
    <ThemeProvider {...provider}>
      {children}
      <BindModal></BindModal>
    </ThemeProvider>
  );
};
