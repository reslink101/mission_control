import { useRef, useEffect } from "react";

/**
 * useAutoScroll
 *
 * Continuously scrolls a container at a fixed pixel-per-frame speed.
 * Pauses on hover / touch, resumes after the wheel-timeout elapses.
 *
 * @param speed – Pixels to scroll per animation frame (default 0.6)
 * @returns     – A ref to attach to the scrollable container element
 */
export function useAutoScroll(speed = 0.6) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    let animationFrameId: number;
    let isPaused = false;
    let wheelTimeout: ReturnType<typeof setTimeout>;

    const scroll = () => {
      if (!isPaused) {
        container.scrollTop += speed;
        if (
          container.scrollTop >=
          container.scrollHeight - container.clientHeight
        ) {
          container.scrollTop = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    animationFrameId = requestAnimationFrame(scroll);

    const pause  = () => { isPaused = true; };
    const resume = () => { isPaused = false; };
    const onWheel = () => {
      isPaused = true;
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => { isPaused = false; }, 1800);
    };

    container.addEventListener("mouseenter",  pause);
    container.addEventListener("mouseleave",  resume);
    container.addEventListener("touchstart",  pause,   { passive: true });
    container.addEventListener("touchend",    onWheel, { passive: true });
    container.addEventListener("wheel",       onWheel, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mouseenter",  pause);
      container.removeEventListener("mouseleave",  resume);
      container.removeEventListener("touchstart",  pause);
      container.removeEventListener("touchend",    onWheel);
      container.removeEventListener("wheel",       onWheel);
      clearTimeout(wheelTimeout);
    };
  }, [speed]);

  return ref;
}
