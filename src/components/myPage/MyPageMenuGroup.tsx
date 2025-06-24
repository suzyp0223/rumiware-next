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
      { label: "주문내역", href: "myPage/orderList" },
      { label: "최근본상품", href: "" },
      { label: "관심상품", href: "" },
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
