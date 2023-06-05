export default function getPixelColor(src: string): string {
  const canvas = document.createElement("canvas");
  const img = document.createElement("img");
  img.src = src;
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  if (ctx === null) return "";
  ctx.drawImage(img, 0, 0, img.width, img.height);
  const pixelData = ctx.getImageData(0, 0, 1, 1).data;
  return pixelData.toString();
}
