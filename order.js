// Calculate the subtotal using reduce
const subtotal = (...prices) => {
  return prices.reduce((total, price) => total + price, 0);
};
// Factory function that returns a discount function
const discountBy = (rate) => {
  return (amount) => amount * (1 - rate);
};
// Add 15% VAT
const withVat = (amount) => {
  return amount * 1.15;
};
// Format amount as Ethiopian Birr
const toETB = (amount) => {
  return `${amount.toFixed(2)} ETB`;
};
// Closure-based receipt maker
const makeReceiptMaker = () => {
  let orderNumber = 0;
  return (amount) => {
    orderNumber += 1;
    return `#${orderNumber}: ${toETB(amount)}`;
  };
};
// Export functions
module.exports = {
  subtotal,
  discountBy,
  withVat,
  toETB,
  makeReceiptMaker,
};
