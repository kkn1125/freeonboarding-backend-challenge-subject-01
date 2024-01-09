export class Card {
  name: string;
  private money: number;

  constructor(name: string, money: number) {
    this.name = name;
    this.money = money;
  }

  /* 카드는 가진 돈에서 충분히 결제 가능한지 계산할 책임이 있다. */
  paySign(payMoney: number) {
    return this.money >= payMoney;
  }

  /* 카드는 가진 돈에서 해당 가격을 지불할 책임이 있다. */
  pay(price: number) {
    this.money -= price;
  }
}
