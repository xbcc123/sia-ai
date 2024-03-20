import {message} from 'antd';
import html2canvas from 'html2canvas';
 

//导出对话
export const exportChat = (configItem: any) => {
    message.info('开始导出对话');
    const elementToExport: any = document.getElementById('exportMessageList');
    // 使用 html2canvas 将 HTML 渲染为图片
    html2canvas(elementToExport).then((canvas) => {
      // 将画布内容转换为 base64 编码的图片数据
      const imageData = canvas.toDataURL('image/png');

      // 创建一个 <a> 元素用于下载
      const downloadLink = document.createElement('a');
      downloadLink.href = imageData; // 将图片数据设置为下载链接的 href
      downloadLink.download = `${configItem.title}${Math.floor(
        Math.random() * 1000,
      )}.png`; // 设置下载的文件名

      // 模拟点击下载链接
      downloadLink.click();
    });
  };
