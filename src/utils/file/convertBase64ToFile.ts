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
  // base64 데이터 value를 디코딩하여 이미지 바이너리를 반환한다.
  const byteString = atob(base64String.split(',')[1]);
  const mimeType = base64String.match(/data:(.*?);base64/)?.[1] || 'image/png';
  const extension = getExtensionFromMimeType(mimeType);
  const byteNumbers = new Array(byteString.length);

  // 바이트 배열 각각의 원소에 바이너리를 ASCII 코드 번호를 할당한다.
  for (let i = 0; i < byteString.length; i += 1) {
    byteNumbers[i] = byteString.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  return new File([byteArray], `${fileName}.${extension}`, { type: mimeType });
};

export default convertBase64ToFile;
