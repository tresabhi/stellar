export default async function getImageDimensionsByURL(src: string) {
  return new Promise<[number, number]>((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = () => resolve([image.width, image.height]);
    image.onerror = () => reject(new Error('failed to parse image'));
  });
}
