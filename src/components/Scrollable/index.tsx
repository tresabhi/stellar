import {
  FC,
  InputHTMLAttributes,
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
} from 'react';
import styles from './index.module.scss';

const PADDING = 4;
const THUMB_MIN_HEIGHT = 64;
const INACTIVE_TIME = 2000;

const Scrollable: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  let timeout: NodeJS.Timeout | undefined;
  const containerRef = useRef<HTMLDivElement>(null!);
  const thumbRef = useRef<HTMLDivElement>(null!);
  let initialY = 0;
  let deltaY = 0;

  const markThumbAsActive = () => {
    if (
      containerRef.current.clientHeight !== containerRef.current.offsetHeight
    ) {
      thumbRef.current.classList.remove(styles.inactive);

      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        thumbRef.current.classList.add(styles.inactive);
      }, INACTIVE_TIME);
    }
  };
  const updateThumb = () => {
    const containerHeight = containerRef.current.getBoundingClientRect().height;

    thumbRef.current.style.height = `${Math.max(
      THUMB_MIN_HEIGHT,
      (containerHeight / containerRef.current.scrollHeight) *
        (containerHeight - PADDING * 2),
    )}px`;

    const thumbHeight = thumbRef.current.getBoundingClientRect().height;
    const progress =
      containerRef.current.scrollTop /
      (containerRef.current.scrollHeight - containerHeight);
    const usableHeight = containerHeight - thumbHeight - PADDING * 2;
    const offset = usableHeight * progress + PADDING;

    thumbRef.current.style.top = `${offset}px`;
  };
  const handleScroll = () => {
    updateThumb();
    markThumbAsActive();
  };
  const handleMouseDown = (event: ReactMouseEvent) => {
    initialY = event.clientY;
    deltaY = 0;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };
  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };
  const handleMouseMove = (event: MouseEvent) => {
    const containerHeight = containerRef.current.getBoundingClientRect().height;
    const thumbHeight = thumbRef.current.getBoundingClientRect().height;
    const usableHeight = containerHeight - thumbHeight - PADDING * 2;
    const ratio = containerRef.current.scrollHeight / usableHeight;
    const lastDeltaY = deltaY;

    deltaY = event.clientY - initialY;
    containerRef.current.scrollTop += (deltaY - lastDeltaY) * ratio;
  };

  useEffect(updateThumb);

  return (
    <div {...props} className={`${styles.scrollable} ${className ?? ''}`}>
      <div
        className={`${styles.thumb} ${styles.inactive}`}
        ref={thumbRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
      <div
        className={styles.container}
        ref={containerRef}
        onScroll={handleScroll}
        onMouseOver={markThumbAsActive}
      >
        {children}
      </div>
    </div>
  );
};
export default Scrollable;
