// 사용법 base64ToBlob(base64_str, 'image/jpeg')
export function base64ToBlob(base64_str: string, content_type: string): Blob {
  const byteCharacters = atob(base64_str.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: content_type });
}