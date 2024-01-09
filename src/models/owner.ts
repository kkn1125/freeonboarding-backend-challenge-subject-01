import { Client } from "./client";
import { Payment } from "./payment";

/* 오너는 지불정보와 고객을 알아야한다. */
export class Owner {
  private paymentHistory: Map<Client, Payment> = new Map();

  /* 오너는 지불 정보를 생성할 책임이 있다. */
  createPayment(client: Client) {
    const payment = new Payment();
    const totalPayMoney = client.cartList.map((cart) => cart.calculate());
    payment.writePayment(totalPayMoney);

    this.paymentHistory.set(client, payment);
  }

  /* 오너는 클라이언트에게 지불 메세지를 보낼 책임이 있다. */
  requestPay(client: Client) {
    const payment = this.paymentHistory.get(client);
    if (payment) {
      /* 클라이언트는 지불금액을 받아 결제 할 책임이 있다. */
      client.cardPay(payment.payMoney());
    }
  }
}
