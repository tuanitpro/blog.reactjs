import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import DOMPurify from "dompurify";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { gql, GraphQLClient } from "graphql-request";
import { useVirtualizer } from "@tanstack/react-virtual";
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
  fetchNextPage: () => Promise<unknown>;
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
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const [scrollMargin, setScrollMargin] = useState(0);

  useLayoutEffect(() => {
    if (!listRef.current) return;
    const listTop = listRef.current.getBoundingClientRect().top;
    setScrollMargin(window.scrollY + listTop);
  }, [isPending, posts.length]);

  const rowVirtualizer = useVirtualizer({
    count: posts.length,
    getScrollElement: () => document.documentElement,
    estimateSize: () => 120,
    overscan: 5,
    scrollMargin,
  });

  // Trigger next page when last virtual item approaches the end
  const virtualItems = rowVirtualizer.getVirtualItems();
  useEffect(() => {
    const lastItem = virtualItems.at(-1);
    if (!lastItem) return;
    if (lastItem.index >= posts.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [virtualItems, hasNextPage, isFetchingNextPage, posts.length, fetchNextPage]);

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
    <article className="w-full">
      {isPending && <Loader />}
      {showEmptyMessage && !isPending && posts.length === 0 && (
        <p className="text-foreground/50 text-sm py-8 text-center">
          Không tìm thấy bài viết nào
        </p>
      )}

      <div ref={listRef} className="divide-y divide-border">
        <div
          style={{ height: rowVirtualizer.getTotalSize(), position: "relative" }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const post = posts[virtualItem.index];
            return (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                ref={rowVirtualizer.measureElement}
                style={{
                  position: "absolute",
                  top: 0,
                  width: "100%",
                  transform: `translateY(${virtualItem.start - rowVirtualizer.options.scrollMargin}px)`,
                }}
                className="border-b border-border"
              >
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.01 }}
                className="flex gap-4 py-5"
              >
                {post?.featuredImage?.node?.mediaItemUrl && (
                  <div className="shrink-0">
                    <img
                      width={80}
                      height={80}
                      src={post.featuredImage.node.mediaItemUrl}
                      alt={post.title}
                      className="w-20 h-20 object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <a
                    href={`#${post.slug}`}
                    className="block text-sm font-semibold text-foreground hover:text-foreground/70 transition-colors leading-snug mb-2"
                  >
                    {post.title}
                  </a>
                  <div
                    className="text-xs text-foreground/60 line-clamp-3 leading-relaxed [&>p]:m-0"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.excerpt) }}
                  />
                </div>
              </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {!isPending && posts.length > 0 && (
        <div className="pb-24 text-center">
          <LoadMoreStatus
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            itemsLength={posts.length}
            variant="bouncing"
          />
        </div>
      )}

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
    </article>
  );
};

export default PostList;
