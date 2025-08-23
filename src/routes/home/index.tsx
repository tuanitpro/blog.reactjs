import PageLayout from "@layouts/PageLayout";

const Home = () => {
  const title = "Tuấn - Hãy theo đuổi đam mê, nợ nần sẽ theo đuổi bạn";
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
        <div className="entry-content">
          <p>Hello world.</p>
        </div>
      </article>
    </PageLayout>
  );
};

export default Home;
