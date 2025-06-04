// 카테고리 데이터를 배열로 정의
export const Category = [
  {
    name: "BEST 100",
    pathName: "/best-100",
    subcategories: [
      { name: "Top 10", pathName: "/best-100/top-10" },
      { name: "Top 50", pathName: "/best-100/top-50" },
    ],
  },
  {
    name: "NEW 10%",
    pathName: "/new-10",
    subcategories: [{ name: "New Arrivals", pathName: "/new-10/arrivals" }],
  },
  {
    name: "SEASON ~90%",
    pathName: "/season",
    subcategories: [{ name: "Seasonal", pathName: "/new-10/seasonal" }],
  },
  {
    name: "SUIT",
    pathName: "/suit",
    subcategories: [
      {
        name: "GUEST_LOOK",
        pathName: "/suit/guest_look",
        thirdSubcategories: [
          { name: "SKIRT", pathName: "/suit/guest_look/skirt" },
          { name: "PANTS", pathName: "/suit/guest_look/pants" },
        ],
      },
      {
        name: "FORMAL",
        pathName: "/suit/formal",
        thirdSubcategories: [
          { name: "SKIRT", pathName: "/suit/formal/skirt" },
          { name: "PANTS", pathName: "/suit/formal/pants" },
        ],
      },
    ],
  },
  {
    name: "OUTER",
    pathName: "/outer",
    subcategories: [
      { name: "CARDIGAN", pathName: "/outer/cardigan" },
      { name: "VEST", pathName: "/outer/vest" },
      { name: "JACKET", pathName: "/outer/jacket" },
      { name: "COAT", pathName: "/outer/coat" },
      { name: "PADDED", pathName: "/outer/padded " },
    ],
  },
  {
    name: "DRESS",
    pathName: "/dress",
    subcategories: [
      {
        name: "LINE",
        pathName: "/dress/line",
        thirdSubcategories: [
          { name: "A-LINE", pathName: "/dress/line/a" },
          { name: "H-LINE", pathName: "/dress/line/h" },
        ],
      },
      { name: "FLARE", pathName: "/dress/flare" },
      { name: "PLAIN", pathName: "/dress/plain" },
      { name: "PATTERN", pathName: "/dress/pattern" },
      { name: "CHIFFON", pathName: "/dress/chiffon" },
      { name: "LACE", pathName: "/dress/lace" },
    ],
  },
  {
    name: "TOP",
    pathName: "/top",
    subcategories: [
      {
        name: "BLOUSE",
        pathName: "/top/blouse",
        thirdSubcategories: [{ name: "SHIRT", pathName: "/top/blouse/shirt" }],
      },
      { name: "KNIT", pathName: "/top/knit" },
      { name: "SLEEVELESS", pathName: "/top/sleeveless" },
      { name: "T-SHIRT", pathName: "/top/t-shirt" },
      {
        name: "HOODIE",
        pathName: "/top/hoodie",
        thirdSubcategories: [{ name: "SWEATSHIRT", pathName: "/top/hoodie/sweatshirt" }],
      },
    ],
  },
  {
    name: "BOTTOM",
    pathName: "/bottom",
    subcategories: [
      { name: "SKIRT", pathName: "/bottom/skirt" },
      { name: "CASUAL_PANTS", pathName: "/bottom/casual_pants" },
      { name: "DENIM", pathName: "/bottom/denim" },
      { name: "SLACKS", pathName: "/bottom/slacks" },
      { name: "SHORTS", pathName: "/bottom/shorts" },
      { name: "LEGGINGS", pathName: "/bottom/leggings" },
    ],
  },

  // { name: '', pathName: '/' },
];
