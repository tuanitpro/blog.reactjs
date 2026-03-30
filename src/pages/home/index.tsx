import { motion } from "motion/react";
import PageLayout from "@layouts/PageLayout";
import PostList from "@components/PostList";
import { usePostsQuery } from "@hooks/usePostsQuery";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const Home = () => {
  const title = "Tuấn - Hãy theo đuổi đam mê, nợ nần sẽ theo đuổi bạn";
  const { posts, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePostsQuery();

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <PageLayout title={title}>
        <>
          <header className="page-title">
            <article className="hentry">
              <div className="entry-content">
                <h1>code, eat, sleep, repeat</h1>
              </div>
            </article>
          </header>
          <PostList
            posts={posts}
            isPending={isPending}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            pageTitle={title}
            navigateOnClose="/"
          />
        </>
      </PageLayout>
    </motion.div>
  );
};

export default Home;
