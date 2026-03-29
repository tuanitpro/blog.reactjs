import { useInfiniteQuery } from "@tanstack/react-query";
import { gql, GraphQLClient } from "graphql-request";
import { post, root } from "@app-types/posts.type";

const client = new GraphQLClient(import.meta.env.VITE_GRAPHQL_ENDPOINT || "");

const homePostsQuery = gql`
  query getManyPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
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

const categoryPostsQuery = gql`
  query getManyPosts($categoryName: String!, $first: Int!, $after: String) {
    posts(
      where: { categoryName: $categoryName }
      first: $first
      after: $after
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
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

type Options = {
  categoryName?: string;
};

export const usePostsQuery = ({ categoryName }: Options = {}) => {
  const query = categoryName ? categoryPostsQuery : homePostsQuery;
  const queryKey = categoryName ? ["posts", categoryName] : ["posts"];

  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam = "" }) =>
        client.request<root>(query, {
          ...(categoryName ? { categoryName } : {}),
          first: 10,
          after: pageParam,
        }),
      getNextPageParam: (lastPage) =>
        lastPage?.posts?.pageInfo?.hasNextPage
          ? lastPage?.posts?.pageInfo?.endCursor
          : undefined,
      initialPageParam: "",
      staleTime: 5 * 60 * 1000,
    });

  const posts: post[] = data?.pages?.flatMap((p) => p.posts.nodes) ?? [];

  return { posts, isPending, fetchNextPage, hasNextPage, isFetchingNextPage };
};
