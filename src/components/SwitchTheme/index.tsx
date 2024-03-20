import { themeProvider } from '@/valtioStore';
import { useSnapshot } from '@umijs/max';
import { Segmented, message } from 'antd';
import { CusIcon } from '../Icon';

// const options = [
//   { label: '自动', value: 'auto' },
//   { label: '亮色', value: 'light' },
//   { label: '暗色', value: 'dark' },
// ];

export const SwitchTheme = () => {
  let {themeMode} = useSnapshot(themeProvider);
  const icons: any = {
    light: 'fa-solid fa-sun',
    dark: 'fa-solid fa-moon',
    auto: 'fa-solid fa-circle-half-stroke',
  };

  return (
    <>
      <span style={{cursor: 'pointer'}} onClick={() => {
		if(themeMode === 'light') {
			localStorage.setItem('themeMode', 'dark')
			themeProvider.themeMode = 'dark'
			// message.success('切换到主题暗黑')
		}
		if(themeMode === 'dark') {
			localStorage.setItem('themeMode', 'auto')
			themeProvider.themeMode = 'auto'
			// message.success('切换到主题自动')
		}
		if(themeMode === 'auto') {
			localStorage.setItem('themeMode', 'light')
			themeProvider.themeMode = 'light'
			// message.success('切换到主题亮色')
		}
	  }}>
        <CusIcon icon={icons[themeMode]}></CusIcon>
      </span>
    </>
  );

  return (
    <Segmented
      size="small"
      value={themeMode}
      onChange={(v) => (themeProvider.themeMode = v)}
      options={options}
    />
  );
};
