import { Product } from "./product";

/* 카트는 프로덕트를 알아야한다. */
export class Cart {
  private product: Product;
  private quantity: number;

  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }

  /* 카트는 프로덕트를 알고 수량과 함께 총 금액을 계산할 수 있다. */
  calculate() {
    return this.product.discountOrNotPrice() * this.quantity;
  }
}
