type NavItem = {
  label: string;
  href: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const MyPageMenuGroup: NavGroup[] = [
  {
    title: "쇼핑정보",
    items: [
      { label: "주문내역", href: "/order/orderSearchMain" },
      { label: "장바구니", href: "/cart" },
      { label: "찜한 상품", href: "/myPage/wishList" },
      { label: "오늘본상품", href: "/items/todayViewItems" },
    ],
  },
  {
    title: "나의정보",
    items: [
      { label: "회원정보", href: "/myPage/myInfo" },
      { label: "내 게시글", href: "/myPage" },
      { label: "적립금내역", href: "/myPage" },
      { label: "쿠폰내역", href: "/myPage" },
    ],
  },
];

export default MyPageMenuGroup;
