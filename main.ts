import { BasicDiscountPolicy } from "./src/implements/basic.discount";
import { Cart } from "./src/models/cart";
import { Client } from "./src/models/client";
import { Owner } from "./src/models/owner";
import { Product } from "./src/models/product";

const basicDiscountPolicy = new BasicDiscountPolicy();

const owner = new Owner('김오너');
const james = new Client("제임스", 20_000);

const sider = new Product("사이다", 1_500, basicDiscountPolicy);
const samdasu = new Product("삼*수", 1_500, basicDiscountPolicy);

james.addCart(new Cart(sider, 2));
james.addCart(new Cart(samdasu, 2));

owner.createPayment(james);
owner.requestPay(james);
