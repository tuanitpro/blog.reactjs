import PageLayout from "@layouts/PageLayout";
import PostList from "@components/PostList";
import { usePostsQuery } from "@hooks/usePostsQuery";

const Home = () => {
  const title = "Tuấn - Hãy theo đuổi đam mê, nợ nần sẽ theo đuổi bạn";
  const { posts, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePostsQuery();

  return (
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
  );
};

export default Home;
