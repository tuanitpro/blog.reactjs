import { useInfiniteQuery } from "@tanstack/react-query";
import { post, ApiPostsResponse } from "@app-types/posts.type";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || "";

type Options = {
  categoryId?: string;
  enabled?: boolean;
};

export const usePostsQuery = ({ categoryId, enabled = true }: Options = {}) => {
  const queryKey = categoryId ? ["posts", categoryId] : ["posts"];

  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<ApiPostsResponse>({
      queryKey,
      enabled,
      queryFn: async ({ pageParam = 1 }) => {
        const params = new URLSearchParams({
          page: String(pageParam),
          limit: "10",
        });
        if (categoryId) params.set("categoryId", categoryId);
        const res = await fetch(`${API_ENDPOINT}/posts?${params}`);
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      },
      getNextPageParam: (lastPage, _allPages, lastPageParam) =>
        lastPage?.pagination?.hasNext ? (lastPageParam as number) + 1 : undefined,
      initialPageParam: 1,
      staleTime: 5 * 60 * 1000,
    });

  const posts: post[] = enabled ? (data?.pages?.flatMap((p) => p.items) ?? []) : [];

  return { posts, isPending: !enabled || isPending, fetchNextPage, hasNextPage, isFetchingNextPage };
};
