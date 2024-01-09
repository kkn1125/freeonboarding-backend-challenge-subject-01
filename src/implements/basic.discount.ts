import { DiscountPolicy } from "./discount.impl";

export class BasicDiscountPolicy implements DiscountPolicy {
  percentage: number = 0.1;
}
