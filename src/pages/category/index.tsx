import { motion } from "motion/react";
import { useParams } from "react-router";
import PageLayout from "@layouts/PageLayout";
import PostList from "@components/PostList";
import { usePostsQuery } from "@hooks/usePostsQuery";
import { useCategoryQuery } from "@hooks/useCategoryQuery";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const Category = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: category } = useCategoryQuery(slug);

  const { posts, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePostsQuery({ categoryId: category?.id });

  const pageTitle = category?.name || "Category";

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <PageLayout title={pageTitle}>
        <article className="prose dark:prose-invert max-w-none">
          <header className="border-b border-border">
            <h1 className="text-foreground">{category?.name || "…"}</h1>
          </header>
          <PostList
            posts={posts}
            isPending={isPending}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            pageTitle={pageTitle}
            navigateOnClose={`/${slug}`}
            showEmptyMessage
          />
        </article>
      </PageLayout>
    </motion.div>
  );
};

export default Category;
