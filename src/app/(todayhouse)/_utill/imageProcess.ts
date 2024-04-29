export function blobToBase64(blob: Blob) {
  let base64 = "";
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = function () {
      const dataUrl = reader.result as string;
      base64 = dataUrl.split(",")[1];
      res(base64);
    };

    reader.onloadend = function () {
      rej(new Error("이미지 변환을 실패하였습니다."));
    };
    reader.readAsDataURL(blob);
  });
}
