# 마트 결제 시스템 class diagram

## 변경 (테스트 케이스 추가)

```mermaid
classDiagram
  class Client {
    String name
    -Card card
    Array~Cart~ cartList

    isPayable(price: number) number
    addCart(cart: Cart) void
    cardPay(totalPayMoney: number) void
    checkMoney() number
  }

  class Owner {
    -paymentHistory: Map~Client, Payment~

    createPayment(client: Client) Payment
    requestPay(client: Client) void
  }

  class Card {
    name: string
    -money: number

    paySign(payMoney: number) boolean
    pay(price: number) void
    checkMoney() number
  }

  class Payment {
    -totalPrice: number
    writePayment(prices: Array~number~) void
    payMoney() number
  }

  class Product {
    name: string
    -price: number
    -discountPolicy: DiscountPolicy
    discountOrNotPrice() number
  }

  class DiscountPolicy {
    <<interface>>
    percentage: number
  }

  class BasicDiscountPolicy {
    precentage: number
  }

  class Cart {
    -product: Product
    -quantity: number

    calculate() number
  }

  Client o..> Card
  Client o..> Cart
  Cart o..> Product
  Product o..> BasicDiscountPolicy
  BasicDiscountPolicy --|> DiscountPolicy
  Owner ..> Client
  Owner ..> Payment
```

## 초안

```mermaid
classDiagram
  class Client {
    -String name
    -Card card
    Array~Cart~ cartList

    isPayable(price: number) number
    addCart(cart: Cart) void
    cardPay(totalPayMoney: number) void
  }

  class Owner {
    -paymentHistory: Map~Client, Payment~

    createPayment(client: Client) void
    requestPay(client: Client) void
  }

  class Card {
    name: string
    -money: number

    paySign(payMoney: number) boolean
    pay(price: number) void
  }

  class Payment {
    -totalPrice: number
    writePayment(prices: Array~number~) void
    payMoney() number
  }

  class Product {
    name: string
    -price: number
    -discountPolicy: DiscountPolicy
    discountOrNotPrice() number
  }

  class DiscountPolicy {
    <<interface>>
    percentage: number
  }

  class BasicDiscountPolicy {
    precentage: number
  }

  class Cart {
    -product: Product
    -quantity: number

    calculate() number
  }

  Client o..> Card
  Client o..> Cart
  Cart ..> Product
  BasicDiscountPolicy --|> DiscountPolicy
  Product ..> BasicDiscountPolicy
  Owner ..> Client
  Owner ..> Payment
```
