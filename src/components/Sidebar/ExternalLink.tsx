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
      <h2 className="text-[10px] font-bold tracking-widest uppercase text-foreground/40 mb-3">
        Liên kết
      </h2>

      {isPending && <Loader />}
      <nav aria-label="Liên kết">
        {data && (
          <ul className="space-y-1 list-none m-0 p-0">
            {data?.menu?.menuItems?.nodes?.map((c) => (
              <li key={c.id}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer nofollow"
                  className="block py-1 text-xs font-medium text-foreground/60 hover:text-foreground transition-colors tracking-wide"
                >
                  {c.label}
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
