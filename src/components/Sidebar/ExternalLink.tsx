import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import { Loader } from "../Loader";
import { readCache, writeCache, CACHE_TTL_MS } from "@utils/cache";

type node = {
  id: string;
  url: string;
  label: string;
};

type menu = {
  menuItems: {
    nodes: node[];
  };
};

type root = {
  menu: menu;
};

const CACHE_KEY = "menus";

const menuItemsQuery = gql`
  {
    menu(id: "dGVybToxMw==") {
      menuItems {
        nodes {
          id
          label
          url
        }
      }
    }
  }
`;

const ExternalLink = () => {
  const { data, isPending } = useQuery<root>({
    queryKey: ["menuItems"],
    queryFn: async () => {
      const result = await request(
        import.meta.env.VITE_GRAPHQL_ENDPOINT,
        menuItemsQuery
      );
      writeCache(CACHE_KEY, result);
      return result;
    },
    initialData: () => readCache<root>(CACHE_KEY),
    staleTime: CACHE_TTL_MS,
  });

  return (
    <aside className="px-5 py-4 border-t border-border">
      <h2 className="text-[9px] font-bold tracking-[0.15em] uppercase text-foreground/35 mb-3">
        Liên kết
      </h2>

      {isPending && <Loader />}
      <nav aria-label="Liên kết">
        {data && (
          <ul className="space-y-0.5 list-none m-0 p-0">
            {data?.menu?.menuItems?.nodes?.map((c) => (
              <li key={c.id}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer nofollow"
                  className="group flex items-center justify-between py-1 text-xs font-medium text-foreground/55 hover:text-foreground transition-colors duration-200 tracking-wide"
                >
                  {c.label}
                  <span className="opacity-0 group-hover:opacity-40 transition-opacity text-[10px]">↗</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </aside>
  );
};

export default ExternalLink;
