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
        <div className="py-24 text-center border-y border-border/30 my-12">
          <span className="micro-label text-accent mb-4 block">Archive</span>
          <h2 className="text-4xl font-bold text-display italic tracking-tight text-foreground/20">
            No articles found in this collection.
          </h2>
          <p className="mt-4 text-foreground/40 font-medium">
            Please check back later or explore other categories.
          </p>
        </div>
      )}

      <div ref={listRef}>
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
                className="border-b border-border/30"
              >
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="group flex flex-col md:flex-row gap-8 py-12"
              >
                {/* Image Section */}
                {post?.featuredImage?.node?.mediaItemUrl && (
                  <div className="w-full md:w-56 shrink-0 -mx-4 md:mx-0">
                    <div className="w-full aspect-[16/9] md:aspect-square md:w-56 md:h-56 overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-700">
                      <motion.img
                        width={640}
                        height={360}
                        src={post.featuredImage.node.mediaItemUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-6 flex-1 min-w-0">
                  {/* Index Section */}
                  <div className="shrink-0">
                    <span className="text-display text-5xl md:text-4xl text-foreground/5 md:text-foreground/10 group-hover:text-accent/20 transition-colors duration-500 block leading-none">
                      {(virtualItem.index + 1).toString().padStart(2, '0')}
                    </span>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 min-w-0">
                    <a
                      href={`#${post.slug}`}
                      className="block text-3xl md:text-2xl font-bold text-foreground group-hover:text-accent transition-all duration-300 leading-tight mb-4 text-display tracking-tight italic"
                    >
                      {post.title}
                    </a>
                    <div
                      className="text-base md:text-sm text-foreground/60 line-clamp-3 leading-relaxed [&>p]:m-0 font-medium"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.excerpt) }}
                    />
                    <div className="mt-8 flex items-center gap-4">
                      <span className="micro-label text-foreground/30">Read Article</span>
                      <div className="h-[1px] flex-1 bg-border/30 group-hover:bg-accent/30 transition-colors duration-500" />
                    </div>
                  </div>
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
