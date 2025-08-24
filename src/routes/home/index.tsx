import PageLayout from "@layouts/PageLayout";

import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import { useMediaQuery } from "react-responsive";

const Home = () => {
  const title = "Tuấn - Hãy theo đuổi đam mê, nợ nần sẽ theo đuổi bạn";

  const postQuery = gql`
    {
      posts {
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

  const { data, isPending } = useQuery({
    queryKey: ["posts"],
    queryFn: async () =>
      request("https://blog.tuanitpro.com/graphql", postQuery),
    select: (res: { posts: { nodes: any } }) => res?.posts?.nodes,
  });

  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <PageLayout title={title}>
      <header className="page-title">
        <article className="hentry">
          <div className="entry-content">
            <h1>code, eat, sleep, repeat</h1>
          </div>
        </article>
      </header>
      <article>
        <div className={isMobile ? "" : "entry-content"}>
          {isPending && "Loading..."}
          <ul>
            {data?.map(
              (post: {
                id: string;
                featuredImage: any;
                title: string;
                link: string;
                excerpt: string;
              }) => (
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
                  <a href={post?.link}>{post.title}</a>
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{
                      __html: post?.excerpt,
                    }}
                  />
                </li>
              )
            )}
          </ul>
        </div>
      </article>
    </PageLayout>
  );
};

export default Home;
