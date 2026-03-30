import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import { Loader } from "../Loader";
import { Link, useLocation } from "react-router";
import { readCache, writeCache, CACHE_TTL_MS } from "@utils/cache";

type node = {
  id: string;
  name: string;
  link: string;
  slug: string;
};

type categories = {
  nodes: node[];
};

type root = {
  categories: categories;
};

const CACHE_KEY = "categories";

const categoriesQuery = gql`
  {
    categories {
      nodes {
        id
        name
        link
        slug
      }
    }
  }
`;

type Props = {
  toggleVisibility?: () => void;
};

const Category = ({ toggleVisibility }: Props) => {
  const location = useLocation();

  const { data, isPending } = useQuery<root>({
    queryKey: ["categories"],
    queryFn: async () => {
      const result = await request(
        import.meta.env.VITE_GRAPHQL_ENDPOINT,
        categoriesQuery
      );
      writeCache(CACHE_KEY, result);
      return result;
    },
    initialData: () => readCache<root>(CACHE_KEY),
    staleTime: CACHE_TTL_MS,
  });

  return (
    <aside className="px-5 py-4 border-t border-border">
      <h2 className="text-[10px] font-bold tracking-widest uppercase text-foreground/40 mb-3">
        Blog
      </h2>

      {isPending && <Loader />}
      <nav aria-label="Blog">
        {data && (
          <ul className="space-y-1 list-none m-0 p-0">
            {data?.categories?.nodes?.map((c) => {
              const isActive = location?.pathname.includes(c.slug);
              return (
                <li key={c.id}>
                  <Link
                    to={c.slug}
                    onClick={() => toggleVisibility?.()}
                    className={`
                      block py-1 text-xs font-medium tracking-wide transition-colors
                      ${isActive
                        ? "text-foreground border-l-2 border-foreground pl-3 -ml-px"
                        : "text-foreground/60 hover:text-foreground"
                      }
                    `}
                  >
                    {c.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </aside>
  );
};

export default Category;
