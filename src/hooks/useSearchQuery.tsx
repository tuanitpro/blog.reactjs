import { useQuery } from "@tanstack/react-query";
import { gql, GraphQLClient } from "graphql-request";
import { root } from "@app-types/posts.type";

const client = new GraphQLClient(import.meta.env.VITE_GRAPHQL_ENDPOINT || "");

const searchPostsQuery = gql`
  query searchPosts($search: String!) {
    posts(where: { search: $search }, first: 20) {
      nodes {
        excerpt
        id
        title
        slug
        link
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`;

export const useSearchQuery = (search: string) => {
  return useQuery({
    queryKey: ["search", search],
    queryFn: async () => {
      if (!search) return { posts: { nodes: [] } };
      return client.request<root>(searchPostsQuery, { search });
    },
    enabled: !!search,
    staleTime: 5 * 60 * 1000,
  });
};
