import { DiscountPolicy } from "../implements/discount.impl";

/* 프로덕트는 할인 정책을 알아야한다. */
export class Product {
  name: string;
  private price: number;
  private discountPolicy: DiscountPolicy;

  constructor(name: string, price: number, discountPolicy: DiscountPolicy) {
    this.name = name;
    this.price = price;
    this.discountPolicy = discountPolicy;
  }

  /* 프로덕트는 가격할인 정책을 알고 금액에서 할인정책을 반영한 금액을 계산할 수 있다. */
  discountOrNotPrice() {
    return this.price * (1 - this.discountPolicy.percentage);
  }
}
