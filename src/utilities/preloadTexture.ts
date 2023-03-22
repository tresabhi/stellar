export default function preloadTexture(src: string) {
  const texture = new Image();
  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    texture.src = src;
    texture.onload = () => resolve(texture);
    texture.onerror = reject;
  });

  return promise;
}
