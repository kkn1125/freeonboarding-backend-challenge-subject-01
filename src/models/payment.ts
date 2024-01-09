export class Payment {
  private totalPrice: number;

  /* 지불 정보는 금액에 대한 총 금액을 계산, 저장 할 수 있다. */
  writePayment(prices: number[]) {
    this.totalPrice = prices.reduce((acc, cur) => acc + cur, 0);
  }

  /* 지불 정보는 계산된 총 금액을 반환 할 수 있다. */
  payMoney() {
    return this.totalPrice;
  }
}
