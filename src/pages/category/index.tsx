import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { gql, GraphQLClient } from "graphql-request";
import { useParams } from "react-router";
import PageLayout from "@layouts/PageLayout";
import PostList from "@components/PostList";
import { usePostsQuery } from "@hooks/usePostsQuery";

const client = new GraphQLClient(import.meta.env.VITE_GRAPHQL_ENDPOINT || "");

const categoryQuery = gql`
  query getSingleCategory($id: ID!) {
    category(id: $id, idType: SLUG) {
      id
      name
    }
  }
`;

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const Category = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: category } = useQuery({
    queryKey: ["category", slug],
    queryFn: () => client.request(categoryQuery, { id: slug }),
    select: (data) => data?.category,
  });

  const { posts, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePostsQuery({ categoryName: slug });

  const pageTitle = category?.name || "Category";

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <PageLayout title={pageTitle}>
        <>
          <header className="page-title">
            <article className="hentry">
              <div className="entry-content">
                <h1>{category?.name || "..."}</h1>
              </div>
            </article>
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
        </>
      </PageLayout>
    </motion.div>
  );
};

export default Category;
