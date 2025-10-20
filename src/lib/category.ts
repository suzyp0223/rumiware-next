// "top/blouse/shirt" → ["top","top/blouse","top/blouse/shirt"]
export const buildCategoryKeys = (pathName: string) => {
  const parts = pathName.split("/").filter(Boolean);
  return parts.map((_, i) => parts.slice(0, i + 1).join("/"));
};

// ["suit","formal"] → "suit/formal"
export const slugToPath = (slug: string[] = []) => slug.filter(Boolean).join("/");
