import { useQuery } from "@tanstack/react-query";
import { ApiPostsResponse } from "@app-types/posts.type";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || "";

export const useSearchQuery = (search: string) => {
  return useQuery<ApiPostsResponse>({
    queryKey: ["search", search],
    queryFn: async () => {
      if (!search) return { items: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0, hasNext: false, hasPrev: false } };
      const res = await fetch(`${API_ENDPOINT}/posts?search=${encodeURIComponent(search)}&limit=20`);
      if (!res.ok) throw new Error("Search failed");
      return res.json();
    },
    enabled: !!search,
    staleTime: 5 * 60 * 1000,
  });
};
