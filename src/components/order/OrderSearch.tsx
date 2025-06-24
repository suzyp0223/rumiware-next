const OrderSearch = () => {
  return (
    <div>
      주문조회
      {/*
          🎁 보너스: 타입 자동 추론
          ts
          복사
          편집
          const shoppingTypes = ["주문내역", "최근본상품", "관심상품"] as const;
          type ShoppingType = (typeof shoppingTypes)[number]; // "주문내역" | ...
          이런 방식으로 단일 리스트 타입만 쓸 수도 있고, 지금처럼 그룹이 있는 경우엔 NavGroup[]이 더 확장성 있어요.
      */}
    </div>
  );
};

export default OrderSearch;
