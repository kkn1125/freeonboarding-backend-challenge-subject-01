import { Card } from "./card";
import { Cart } from "./cart";

/* 고객은 카드와 카트를 알아야한다. */
export class Client {
  private name: string;
  private card: Card;
  cartList: Cart[] = [];

  constructor(name: string, money: number) {
    this.name = name;
    this.card = new Card("신한카드", money);
  }

  /* 고객은 자신의 돈이 적절한지 카드에게 확인 요청할 수 있다. */
  isPayable(price: number) {
    return this.card.paySign(price);
  }

  /* 고객은 카트를 알고 제어할 수 있다. */
  addCart(cart: Cart) {
    this.cartList.push(cart);
  }

  /* 고객은 지불 정보를 받고, 카드를 알고 있으며, 카드에게 결제 요청 할 수 있다. */
  cardPay(totalPayMoney: number) {
    const isPayable = this.isPayable(totalPayMoney);
    if (isPayable) {
      this.card.pay(totalPayMoney);
    }
  }
}
