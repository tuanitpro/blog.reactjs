import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import { useMediaQuery } from "react-responsive";
import PageLayout from "@layouts/PageLayout";
import Modal from "@components/Modal";
import { Loader } from "@components/Loader";

type featuredImage = {
  node: {
    mediaItemUrl: string;
  };
};

type post = {
  excerpt: string;
  content: string;
  id: string;
  title?: string;
  slug: string;
  link: string;
  featuredImage: featuredImage;
};

type root = {
  posts: {
    nodes: post[];
  };
};

const Home = () => {
  const title = "Tuấn - Hãy theo đuổi đam mê, nợ nần sẽ theo đuổi bạn";

  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const [post, setPost] = useState<post>();

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

  const { data, isPending } = useQuery<root>({
    queryKey: ["posts"],
    queryFn: () => request("https://blog.tuanitpro.com/graphql", postQuery),
  });

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (location?.hash && data && !open) {
      const findPost = data?.posts?.nodes?.find(
        (p) => p?.slug === location?.hash?.replace("#", "")
      );
      if (findPost) {
        setOpen(true);
        setPost(findPost);
        document.title = findPost?.title || title;
      }
    }
  }, [location, data]);

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
        <Modal
          title={post?.title || "Not Found"}
          open={open}
          onClose={() => {
            setOpen(false);
            setPost(undefined);
            navigate("/", { replace: true });
            document.title = title;
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: post?.content,
            }}
          />
        </Modal>
      )}
      <article className="hentry">
        <div className={isMobile ? "" : "entry-content"}>
          {isPending && <Loader />}
          <ul>
            {data?.posts?.nodes?.map((post) => (
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
                <a href={`#${post?.slug}`} style={{ cursor: "pointer" }}>
                  {post.title}
                </a>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html: post?.excerpt,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </article>
    </PageLayout>
  );
};

export default Home;
