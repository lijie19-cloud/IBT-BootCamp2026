// run.js

const { subtotal, discountBy, withVat, makeReceiptMaker } = require("./order");

// Create a 10% member discount
const memberDiscount = discountBy(0.1);

// Create the receipt maker
const makeReceipt = makeReceiptMaker();

// Order 1
const order1 = withVat(memberDiscount(subtotal(200, 180, 120)));

// Order 2
const order2 = withVat(memberDiscount(subtotal(350, 200)));

// Order 3
const order3 = withVat(subtotal(500, 150, 100));

// Print receipts
console.log(makeReceipt(order1));
console.log(makeReceipt(order2));
console.log(makeReceipt(order3));
