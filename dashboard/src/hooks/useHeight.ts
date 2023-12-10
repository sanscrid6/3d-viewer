import { MutableRefObject, useEffect, useState } from 'react';

export function useHeight(el: MutableRefObject<HTMLElement | null>) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const value = el.current;

    if (!value) return;

    function calculateHeight() {
      if (!value) return;

      const { height } = value.getBoundingClientRect();
      setHeight(height);
    }

    const r = new ResizeObserver(calculateHeight);
    r.observe(value);

    return () => {
      r.unobserve(value);
    };
  }, [el]);

  return height;
}
