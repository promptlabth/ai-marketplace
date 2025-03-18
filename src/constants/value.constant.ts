export const subscriptionPlanPrizeIdMap: {
    [key: string]: { planId: number;  title: string; prizeId: string, price: number };
  } = {
    FREE: { planId: 1, title: "FREE", prizeId: "", price: 0 },
    BRONZE: { planId: 2, title: "BRONZE", prizeId: "price_1R3oaMAom1IgIvKKM3O1LlgH", price: 59 },
    SILVER: { planId: 3, title: "SILVER", prizeId: "price_1OLShKAom1IgIvKKt8q5fCBI", price: 199 },
    GOLD: { planId: 4, title: "GOLD", prizeId: "price_1OLSi0Aom1IgIvKKD24dXvtu", price: 299 },
    BRONZE_MONTHLY: { planId: 2, title: "MONTHLY BRONZE", prizeId: "price_1PaHGZAom1IgIvKKyKmus1gZ", price: 599 },
    SILVER_MONTHLY: { planId: 3, title: "MONTHLY SILVER", prizeId: "price_1PaHNEAom1IgIvKKhpJ3bLvD", price: 1999 },
    GOLD_MONTHLY: { planId: 4, title: "MONTHLY GOLD", prizeId: "price_1PaHNfAom1IgIvKKj7GwPY0I", price: 2999 },
  };