import services from '@/services/ai';
const md5 = require('md5');

export const isMobile = () => {
  return window.screen.availWidth <= 450;
};

export const todayNotShow = () => {
  // 获取当前日期
  var currentDate = new Date();

  // 获取今天的日期部分（年、月、日）
  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth() + 1; // 月份从0开始，所以要加1
  var currentDay = currentDate.getDate();

  // 构建今天的日期字符串，格式为YYYY-MM-DD
  var todayDate = currentYear + '-' + currentMonth + '-' + currentDay;

  // 获取要隐藏的元素
  //   var elementToHide = document.getElementById('yourElementId'); // 请将 'yourElementId' 替换为实际元素的ID

  // 获取存储的上次展示日期（假设使用localStorage存储）
  var lastShownDate = localStorage.getItem('lastShownDate');

  if (lastShownDate !== todayDate) {
    // // 如果上次展示日期不是今天，则隐藏元素，并更新上次展示日期
    // elementToHide.style.display = 'none';
    localStorage.setItem('lastShownDate', todayDate);
  }
};

export const isLogin = () => {
  return localStorage.getItem('token');
};

// 获取文件路径名称 去掉后缀
export const getPathName = (url: string) => {
  try {
    const urlObject = new URL(url);
    const extractedString = urlObject.pathname;
    return extractedString;
  } catch (error) {
    return '';
  }
};

export const getMiniImgUrl = (url: string, domain: string | undefined) => {
  let result = `${domain}${url}`;
  if (url?.includes?.('oss-')) {
    result = url;
  }
  return result;
};

// 获取信息
export const getUserInfoSet = async () => {
  try {
    const data = await services.LoginController.userInfo();
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {}
};

//  对比prompt
export const isDiffPrompt = (str1: string, str2: string) => {
  return str1.replace(/,|\s|\t/g, '') === str2.replace(/,|\s|\t/g, '');
};

// 加密
export function saltAndHash(password: any, salt: any) {
  var saltedPassword = password + salt; // 将密码和盐值拼接在一起
  var hashedPassword = md5(saltedPassword); // 使用MD5加密
  return hashedPassword;
}

//  生成文件对象
export const generateFile = (url: string, fileUrl: string) => {
  return {
    url,
    uid: url,
    name: url,
    status: 'done',
    response: fileUrl,
  };
};

export const removeBase64Prefix = (base64String: string) => {
  // 使用正则表达式匹配可能的前缀
  const regex = /^data:[\w\/\-\+]+;base64,/;
  return base64String.replace(regex, '');
};

export const addBase64Prefix = (base64String: string, prefixType: string) => {
  // 验证参数，确保前缀类型是合法的
  if (!prefixType || typeof prefixType !== 'string') {
    throw new Error('Invalid prefix type');
  }
  // 添加指定的前缀类型
  const prefixedBase64 = `data:${prefixType};base64,${base64String}`;
  return prefixedBase64;
};
