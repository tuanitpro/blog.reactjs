import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { gql, GraphQLClient } from "graphql-request";
import { useInfiniteScroll } from "@hooks/useInfiniteScroll";
import { useMediaQuery } from "react-responsive";
import PageLayout from "@layouts/PageLayout";
import Modal from "@components/Modal";
import { Loader } from "@components/Loader";
import { LoadMoreStatus } from "@components/LoadMoreSpinner";

type featuredImage = {
  node: {
    mediaItemUrl: string;
  };
};

type post = {
  excerpt: string;
  content: string;
  id: string;
  title?: string;
  slug: string;
  link: string;
  featuredImage: featuredImage;
};

type root = {
  posts: {
    nodes: post[];
    pageInfo: pageInfo;
  };
};

type pageInfo = {
  hasNextPage: boolean;
  endCursor: string;
};

const Home = () => {
  const title = "Tuấn - Hãy theo đuổi đam mê, nợ nần sẽ theo đuổi bạn";

  const location = useLocation();
  const navigate = useNavigate();
  const client = new GraphQLClient(import.meta.env.REACT_APP_GRAPHQL_ENDPOINT || "");

  const [open, setOpen] = useState<boolean>(false);

  const postsPagingQuery = gql`
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

  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam = "" }) =>
        client.request<root>(postsPagingQuery, {
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
  const isMobile = useMediaQuery({ maxWidth: 767 });

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
    <PageLayout title={title}>
      <header className="page-title">
        <article className="hentry">
          <div className="entry-content">
            <h1>code, eat, sleep, repeat</h1>
          </div>
        </article>
      </header>
      <article className="hentry">
        <div className={isMobile ? "" : "entry-content"}>
          {isPending && <Loader />}
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
        {!isPending && posts?.length > 0 && (
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
          title={getPostMutation?.data?.post?.title || "Bạn đợi chút, tôi đang tải bài viết..."}
          open={open}
          onClose={() => {
            setOpen(false);
            navigate("/", { replace: true });
            document.title = title;
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

export default Home;
