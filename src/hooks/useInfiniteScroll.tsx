import { useEffect, useRef } from "react";

type Props = {
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<any>;
  isFetchingNextPage: boolean;
};
export const useInfiniteScroll = ({
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: Props) => {
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px 400px 0px", // Load when 100px from viewport
      }
    );

    const currentLoader = loaderRef.current;

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  return loaderRef;
};
