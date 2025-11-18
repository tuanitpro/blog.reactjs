import PageLayout from "@layouts/PageLayout";

import { useLocation, useNavigate, useParams } from "react-router";

import { gql, GraphQLClient } from "graphql-request";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { Loader } from "@components/Loader";
import { useMediaQuery } from "react-responsive";

import { post } from "@types/posts.type";
import { LoadMoreStatus } from "@components/LoadMoreSpinner";
import { useInfiniteScroll } from "@hooks/useInfiniteScroll";
import { useEffect, useState } from "react";
import Modal from "@components/Modal";

const Category = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const title = "Category";
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const client = new GraphQLClient(
    import.meta.env.REACT_APP_GRAPHQL_ENDPOINT || ""
  );
  const categoryQuery = gql`
    query getSingleCategory($id: ID!) {
      category(id: $id, idType: SLUG) {
        id
        name
      }
    }
  `;

  const { data: category } = useQuery({
    queryKey: ["category", slug],
    queryFn: () => client.request(categoryQuery, { id: slug }),
    select: (data) => data?.category,
  });

  const postsPagingQuery = gql`
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

  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", slug],
      queryFn: ({ pageParam = "" }) =>
        client.request(postsPagingQuery, {
          categoryName: slug,
          first: 10,
          after: pageParam,
        }),
      getNextPageParam: (lastPage) => {
        return lastPage?.posts?.pageInfo?.hasNextPage
          ? lastPage?.posts?.pageInfo?.endCursor
          : undefined;
      },
      initialPageParam: "",
      staleTime: 5 * 60 * 1000,
    });

  const posts = data?.pages?.flatMap((p) => p.posts.nodes) || [];

  const loaderRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  });

  const postQuery = gql`
    query getSinglePost($id: ID!) {
      post(id: $id, idType: SLUG) {
        id
        title
        content
      }
    }
  `;

  const getPostMutation = useMutation({
    mutationFn: async (slug: string) => {
      return client.request<{ post: post }>(postQuery, {
        id: slug,
      });
    },
    onMutate: () => {
      document.title = "Đang tải bài viết...";
      setOpen(true);
    },
    onSuccess: (data) => {
      document.title = data?.post?.title || title;
    },
    onError: () => {},
  });

  useEffect(() => {
    if (location?.hash && data && !open) {
      const slug = location?.hash?.replace("#", "");
      getPostMutation.mutate(slug);
    }
  }, [location, data]);

  return (
    <PageLayout title={category?.name || title}>
      <header className="page-title">
        <article className="hentry">
          <div className="entry-content">
            <h1>{category?.name || "..."} </h1>
          </div>
        </article>
      </header>
      <article className="hentry">
        <div className={isMobile ? "" : "entry-content"}>
          {isPending && <Loader />}
          {posts?.length === 0 && !isPending && (
            <>Không tìm thấy bài viết nào</>
          )}
          <ul>
            {posts?.map((post: post) => (
              <li key={post.id}>
                {post?.featuredImage?.node?.mediaItemUrl && (
                  <div className="my-thumbnail">
                    <img
                      width={150}
                      height={150}
                      src={post?.featuredImage?.node?.mediaItemUrl}
                      alt={post.title}
                    />
                  </div>
                )}
                <a href={`#${post?.slug}`} style={{ cursor: "pointer" }}>
                  {post.title}
                </a>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html: post?.excerpt,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
        {!isPending && posts?.length >= 10 && (
          <div
            ref={loaderRef}
            style={{ paddingBottom: "100px", textAlign: "center" }}
          >
            <LoadMoreStatus
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              itemsLength={posts.length}
              variant="bouncing" // Try: 'spinner', 'pulse', or 'bouncing'
            />
          </div>
        )}
      </article>
      {open && (
        <Modal
          title={
            getPostMutation?.data?.post?.title ||
            "Bạn đợi chút, tôi đang tải bài viết..."
          }
          open={open}
          onClose={() => {
            setOpen(false);
            navigate("/" + slug, { replace: true });
            document.title = category?.name || title;
          }}
        >
          {getPostMutation.isSuccess && getPostMutation?.data?.post && (
            <div
              dangerouslySetInnerHTML={{
                __html: getPostMutation?.data?.post?.content,
              }}
            />
          )}
          {getPostMutation.isPending && <Loader />}
        </Modal>
      )}
    </PageLayout>
  );
};

export default Category;
