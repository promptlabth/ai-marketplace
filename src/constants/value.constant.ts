export const subscriptionPlanPrizeIdMap: {
    [key: string]: { planId: number;  title: string; prizeId: string, price: number };
  } = {
    FREE: { planId: 4, title: "FREE", prizeId: "", price: 0 },
    BRONZE: { planId: 1, title: "BRONZE", prizeId: "price_1OLSgkAom1IgIvKK9c3qAqMT", price: 59 },
    SILVER: { planId: 2, title: "SILVER", prizeId: "price_1OLShKAom1IgIvKKt8q5fCBI", price: 199 },
    GOLD: { planId: 3, title: "GOLD", prizeId: "price_1OLSi0Aom1IgIvKKD24dXvtu", price: 299 },
    BRONZE_ONETIME: { planId: 1, title: "One-Time BRONZE", prizeId: "price_1PMo3eAom1IgIvKK3jWz7qPS", price: 59 },
    SILVER_ONETIME: { planId: 2, title: "One-Time SILVER", prizeId: "price_1QFXRZAom1IgIvKKq6qnjebZ", price: 199 },
    GOLD_ONETIME: { planId: 3, title: "One-Time GOLD", prizeId: "price_1RIr6uAom1IgIvKK7yAaph0Q", price: 299 },
    // Test
    // BRONZE: { planId: 1, title: "BRONZE", prizeId: "price_1R3oaMAom1IgIvKKM3O1LlgH", price: 59 },
    // BRONZE_ONETIME: { planId: 1, title: "One-Time BRONZE", prizeId: "price_1R3ob8Aom1IgIvKKXshjGKqd", price: 59 }, 
  };