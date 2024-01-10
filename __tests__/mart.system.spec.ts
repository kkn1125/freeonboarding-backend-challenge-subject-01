import { BasicDiscountPolicy } from "../src/implements/basic.discount";
import { DiscountPolicy } from "../src/implements/discount.impl";
import { Cart } from "../src/models/cart";
import { Client } from "../src/models/client";
import { Owner } from "../src/models/owner";
import { Payment } from "../src/models/payment";
import { Product } from "../src/models/product";

class WaterOnlyDiscountPolicy implements DiscountPolicy {
  percentage: number = 0.5;
}
class NoDiscountPolicy implements DiscountPolicy {
  percentage: number = 0.0;
}

const discountPolicies = {
  none: new NoDiscountPolicy(),
  basic: new BasicDiscountPolicy(),
  waterOnly: new WaterOnlyDiscountPolicy(),
};

const items = {
  samdasu: new Product("삼다수", 1_500, discountPolicies.waterOnly),
  onion: new Product("양파", 980, discountPolicies.basic),
  ramen: new Product("라면", 1120, discountPolicies.basic),
  paper: new Product("종이", 50, discountPolicies.none),
};

describe("마트 시스템 검증", () => {
  let owner: Owner;
  let clients: Map<string, Client> = new Map();

  beforeEach(() => {
    owner = new Owner("김오너");
    clients.set("김고객", new Client("김고객", 50_000));
  });

  afterEach(() => {
    clients.clear();
  });

  it("정의 검증", () => {
    expect(owner).toBeDefined();
    expect(owner.name).toStrictEqual("김오너");
    expect(clients.get("김고객")).toBeDefined();
  });

  it("오너 지불 정보 생성 검증 (빈 프로덕트 카트)", () => {
    const client = clients.get("김고객");
    if (client) {
      const payment = owner.createPayment(client);
      expect(payment).toStrictEqual(new Payment());
      expect(clients.get("김고객")).toBeDefined();
    }
  });

  it("오너 지불 정보 생성 검증 (프로덕트 카트)", () => {
    const client = clients.get("김고객");
    const expectedPayment = new Payment();
    const writePaymentSpy = jest.spyOn(expectedPayment, "writePayment");
    let expectedTotalPayMoney;

    if (client) {
      const createPaymentSpy = jest
        .spyOn(owner, "createPayment")
        .mockImplementation((client: Client) => {
          if (client.cartList.length > 0) {
            const totalPayMoney = (expectedTotalPayMoney = client.cartList.map(
              (cart) => cart.calculate()
            ));
            expectedPayment.writePayment(totalPayMoney);
          }
          return expectedPayment;
        });
      const addCartSpy = jest.spyOn(client, "addCart");

      const samdasu = new Cart(items.samdasu, 2);
      const paper = new Cart(items.paper, 2);
      const onion = new Cart(items.onion, 2);

      client.addCart(samdasu);
      client.addCart(paper);
      client.addCart(onion);

      const payment = owner.createPayment(client);

      expect(createPaymentSpy).toHaveBeenCalled();
      expect(addCartSpy).toHaveBeenCalled();
      expect(writePaymentSpy).toHaveBeenCalled();

      expect(createPaymentSpy).toHaveBeenCalledWith(client);
      expect(addCartSpy).toHaveBeenCalledWith(samdasu);
      expect(addCartSpy).toHaveBeenCalledWith(paper);
      expect(addCartSpy).toHaveBeenCalledWith(onion);
      expect(writePaymentSpy).toHaveBeenCalledWith(expectedTotalPayMoney);

      expect(createPaymentSpy).toHaveBeenCalledTimes(1);
      expect(addCartSpy).toHaveBeenCalledTimes(3);
      expect(writePaymentSpy).toHaveBeenCalledTimes(1);

      expect(expectedPayment).toStrictEqual(payment);
    }
  });

  it("지불 후 클라이언트 잔액 확인", () => {
    const client = clients.get("김고객");
    if (client) {
      const clientCardMoney = client.checkMoney();
      const requestPaySpy = jest.spyOn(owner, "requestPay");
      const samdasu = new Cart(items.samdasu, 2);
      const onion = new Cart(items.onion, 5);

      const waterDiscountPercent = 1 - discountPolicies.waterOnly.percentage;
      const basicDiscountPercent = 1 - discountPolicies.basic.percentage;

      const waterPrice = 1_500 * waterDiscountPercent * 2;
      const onionPrice = 980 * basicDiscountPercent * 5;

      const totalPayMoney = waterPrice + onionPrice;

      client.addCart(samdasu);
      client.addCart(onion);

      owner.createPayment(client);
      owner.requestPay(client);

      const clientCardRestMoney = client.checkMoney();

      expect(requestPaySpy).toHaveBeenCalled();
      expect(requestPaySpy).toHaveBeenCalledWith(client);
      expect(requestPaySpy).toHaveBeenCalledTimes(1);

      expect(clientCardRestMoney).toStrictEqual(
        clientCardMoney - totalPayMoney
      );
    }
  });
});
