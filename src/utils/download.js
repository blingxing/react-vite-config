import { downloadRequest } from './request';

function downloadFile(url, fileName = '') {
  const link = document.createElement('a');
  link.target = '_blank';
  link.download = fileName;
  link.href = url;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const readErrMsgFromBlob = (blob) => {
  return new Promise((resolve) => {
    const fr = new FileReader();
    fr.onload = function (e) {
      try {
        const result = JSON.parse(e.target.result);
        resolve(result.message || '下载出错');
      } catch (error) {
        resolve('下载出错');
      }
    };
    fr.readAsText(blob);
  });
};

const downloadByRequest = async (type, url = '', data = {}) => {
  const s = await downloadRequest[type](url, data);
  let fileName;
  if (s.headers['content-disposition']) {
    fileName = decodeURI(s.headers['content-disposition'].split('=')[1]);
  }
  if (fileName && s.data instanceof Blob) {
    let downloadUrl = '';
    if (window.Blob && window.URL) {
      downloadUrl = URL.createObjectURL(s.data);
    } else if (window.navigator && window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, fileName);
    } else {
      return '浏览器不支持blob下载';
    }
    if (downloadUrl !== '') {
      downloadFile(downloadUrl, fileName);
    }
    return '';
  }
  const errMsg = await readErrMsgFromBlob(s.data);
  return errMsg;
};
export const downloadByPost = (url = '', data = {}) => downloadByRequest('post', url, data);
export const downloadByGet = (url = '', data = {}) => downloadByRequest('get', url, data);
