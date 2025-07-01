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
      { label: "찜한 상품", href: "/myPage/wishListMain" },
      { label: "오늘본상품", href: "/items/todayViewItems" },
    ],
  },
  {
    title: "나의정보",
    items: [
      { label: "회원정보", href: "/myPage/myInfo" },
      { label: "리뷰관리", href: "/myPage/myReview" },
      { label: "적립금내역", href: "/benefit/pointHistoryMain" },
      { label: "쿠폰내역", href: "/benefit/couponHistoryMain" },
    ],
  },
];

export default MyPageMenuGroup;
