import { useState, useEffect, useRef } from "react";

/**
 * useRegistryFlash
 *
 * Animates a live-data table by randomly flashing a row and replacing its
 * value at each interval. Pauses when the user hovers or scrolls the
 * container, and resumes after they leave.
 *
 * @param items      – Initial row array
 * @param buildItem  – Factory that creates a new row given (seed, index)
 * @param interval   – Flash interval in ms (default 420)
 */
export function useRegistryFlash<T>(
  items: T[],
  buildItem: (seed: number, i: number) => T,
  interval = 420
) {
  const [rows, setRows] = useState<T[]>(() => items);
  const [flashIdx, setFlashIdx] = useState<number | null>(null);
  const isPausedRef = useRef(false);
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setRows(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  useEffect(() => {
    const tick = setInterval(() => {
      if (isPausedRef.current) return;
      const idx = Math.floor(Math.random() * items.length);
      setFlashIdx(idx);
      setRows((prev) => {
        const next = [...prev];
        next[idx] = buildItem(Date.now() + idx, idx);
        return next;
      });
      setTimeout(() => setFlashIdx(null), 280);
    }, interval);
    return () => clearInterval(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval, items.length]);

  const onEnter = () => { isPausedRef.current = true; };
  const onLeave = () => {
    if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    isPausedRef.current = false;
  };
  const onWheel = () => {
    isPausedRef.current = true;
    if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    wheelTimerRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 1800);
  };

  const setRef = (el: HTMLElement | null) => {
    if (!el || containerRef.current === el) return;
    const old = containerRef.current;
    if (old) {
      old.removeEventListener("mouseenter", onEnter);
      old.removeEventListener("mouseleave", onLeave);
      old.removeEventListener("wheel", onWheel);
      old.removeEventListener("touchstart", onEnter);
      old.removeEventListener("touchend", onWheel);
    }
    containerRef.current = el;
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("touchstart", onEnter, { passive: true });
    el.addEventListener("touchend", onWheel, { passive: true });
  };

  return { rows, flashIdx, setRef };
}
