import { FC, InputHTMLAttributes, useEffect, useRef } from 'react';
import styles from './index.module.scss';

const PADDING = 4;
const THUMB_MIN_HEIGHT = 64;

const Scrollable: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const thumbRef = useRef<HTMLDivElement>(null!);

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

  useEffect(updateThumb);

  return (
    <div {...props} className={`${styles.scrollable} ${className ?? ''}`}>
      <div className={styles.thumb} ref={thumbRef} />
      <div
        className={styles.container}
        ref={containerRef}
        onScroll={updateThumb}
      >
        {children}
      </div>
    </div>
  );
};
export default Scrollable;
