import PageLayout from "@layouts/PageLayout";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import { useMediaQuery } from "react-responsive";
import Modal from "@components/Modal";

const Home = () => {
  const title = "Tuấn - Hãy theo đuổi đam mê, nợ nần sẽ theo đuổi bạn";

  const [open, setOpen] = useState<boolean>(false);
  const [post, setPost] = useState<any>(undefined);

  const postQuery = gql`
    {
      posts {
        nodes {
          excerpt
          content
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
      {open && post && (
        <Modal title={post?.title} open={open} onClose={() => {
          setOpen(false)
          setPost(undefined)
        }}>
          <div
            dangerouslySetInnerHTML={{
              __html: post?.content,
            }}
          />
        </Modal>
      )}
      <article className="hentry">
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
                  <a
                    onClick={() => {
                      setOpen(true);
                      setPost(post);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {post.title}
                  </a>
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
