const getExtensionFromMimeType = (mimeType: string): string => {
  switch (mimeType) {
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/gif':
      return 'gif';
    case 'image/webp':
      return 'webp';
    default:
      return 'png';
  }
};

const convertBase64ToFile = (base64String: string, fileName: string): File => {
  const byteString = atob(base64String.split(',')[1]); // base64에서 데이터 부분 추출
  const mimeType = base64String.match(/data:(.*?);base64/)?.[1] || 'image/png';
  const extension = getExtensionFromMimeType(mimeType);
  const byteNumbers = new Array(byteString.length);

  const byteArray = new Uint8Array(byteNumbers);

  return new File([byteArray], `${fileName}.${extension}`, { type: mimeType });
};

export default convertBase64ToFile;
