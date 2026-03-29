import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { gql, GraphQLClient } from "graphql-request";
import { useMediaQuery } from "react-responsive";
import { useInfiniteScroll } from "@hooks/useInfiniteScroll";
import Modal from "@components/Modal";
import { Loader } from "@components/Loader";
import { LoadMoreStatus } from "@components/LoadMoreSpinner";
import { post } from "@app-types/posts.type";

const client = new GraphQLClient(import.meta.env.VITE_GRAPHQL_ENDPOINT || "");

const singlePostQuery = gql`
  query getSinglePost($id: ID!) {
    post(id: $id, idType: SLUG) {
      id
      title
      content
    }
  }
`;

type Props = {
  posts: post[];
  isPending: boolean;
  fetchNextPage: () => Promise<any>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  pageTitle: string;
  navigateOnClose: string;
  showEmptyMessage?: boolean;
};

const PostList = ({
  posts,
  isPending,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  pageTitle,
  navigateOnClose,
  showEmptyMessage = false,
}: Props) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const loaderRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  });

  const getPostMutation = useMutation({
    mutationFn: async (slug: string) =>
      client.request<{ post: post }>(singlePostQuery, { id: slug }),
    onMutate: () => {
      document.title = "Đang tải bài viết...";
      setOpen(true);
    },
    onSuccess: (data) => {
      document.title = data?.post?.title || pageTitle;
    },
    onError: () => {
      document.title = pageTitle;
    },
  });

  useEffect(() => {
    if (location?.hash && !isPending) {
      const slug = location.hash.replace("#", "");
      getPostMutation.mutate(slug);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, isPending]);

  return (
    <article className="hentry">
      <div className={isMobile ? "" : "entry-content"}>
        {isPending && <Loader />}
        {showEmptyMessage && !isPending && posts.length === 0 && (
          <>Không tìm thấy bài viết nào</>
        )}
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              {post?.featuredImage?.node?.mediaItemUrl && (
                <div className="my-thumbnail">
                  <img
                    width={150}
                    height={150}
                    src={post.featuredImage.node.mediaItemUrl}
                    alt={post.title}
                  />
                </div>
              )}
              <a href={`#${post.slug}`} style={{ cursor: "pointer" }}>
                {post.title}
              </a>
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.excerpt) }}
              />
            </li>
          ))}
        </ul>
      </div>
      {!isPending && posts.length > 0 && (
        <div
          ref={loaderRef}
          style={{ paddingBottom: "100px", textAlign: "center" }}
        >
          <LoadMoreStatus
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            itemsLength={posts.length}
            variant="bouncing"
          />
        </div>
      )}
      {open && (
        <Modal
          title={
            getPostMutation?.data?.post?.title ||
            "Bạn đợi chút, tôi đang tải bài viết..."
          }
          open={open}
          onClose={() => {
            setOpen(false);
            navigate(navigateOnClose, { replace: true });
            document.title = pageTitle;
          }}
        >
          {getPostMutation.isSuccess && getPostMutation?.data?.post && (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(getPostMutation.data.post.content),
              }}
            />
          )}
          {getPostMutation.isPending && <Loader />}
          {getPostMutation.isError && (
            <p>Không thể tải bài viết. Vui lòng thử lại.</p>
          )}
        </Modal>
      )}
    </article>
  );
};

export default PostList;
