import { useQuery } from "@tanstack/react-query";
import { ApiCategory } from "@app-types/posts.type";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || "";

export const useCategoryQuery = (slug?: string) => {
  return useQuery<ApiCategory>({
    queryKey: ["category", slug],
    queryFn: async () => {
      const res = await fetch(`${API_ENDPOINT}/categories/slug/${slug}`);
      if (!res.ok) throw new Error("Failed to fetch category");
      return res.json();
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};
