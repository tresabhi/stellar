/**
 * Thanks Matthew Crumley!
 *
 * https://stackoverflow.com/a/2521335/12294756
 */
export default function resizeImage(url: string, size: number) {
  const promise = new Promise<string>((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const maxSize = Math.min(image.width, image.height);
      const scale = size / maxSize;
      canvas.width = size;
      canvas.height = size;
      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;

      canvas
        .getContext('2d')
        ?.drawImage(
          image,
          size / 2 - drawWidth / 2,
          size / 2 - drawHeight / 2,
          drawWidth,
          drawHeight,
        );
      resolve(canvas.toDataURL());
    };
    image.onerror = reject;
    image.src = url;
  });

  return promise;
}
