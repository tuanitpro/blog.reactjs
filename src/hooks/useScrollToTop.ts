import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToTop(ref?: React.RefObject<HTMLElement>) {
  const { pathname, search } = useLocation();
  useEffect(() => {
    const el = ref?.current ?? window;
    el.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, search, ref]);
}
