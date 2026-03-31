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
    <aside className="px-8 py-6 border-t border-border/30">
      <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/30 mb-4">
        Chuyên mục
      </h2>

      {isPending && <Loader />}
      <nav aria-label="Blog">
        {data && (
          <ul className="space-y-0.5 list-none m-0 p-0">
            {data?.categories?.nodes?.map((c) => {
              const isActive = location?.pathname.includes(c.slug);
              return (
                <li key={c.id}>
                  <Link
                    to={c.slug}
                    onClick={() => toggleVisibility?.()}
                    className={`
                      group flex items-center justify-between py-1 text-xs font-medium tracking-wide transition-colors duration-200
                      ${isActive
                        ? "text-accent border-l-2 border-accent pl-3 -ml-px"
                        : "text-foreground/55 hover:text-foreground"
                      }
                    `}
                  >
                    {c.name}
                    <span className="opacity-0 group-hover:opacity-40 transition-opacity text-[10px]">→</span>
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
