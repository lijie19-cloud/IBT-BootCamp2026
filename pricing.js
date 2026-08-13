const VAT_RATE = 0.15; // Assuming a 15% VAT rate
export const withVat = (amount) => amount * (1 + VAT_RATE);
export const format = (amount) => `${amount.toFixed(2)} ETB`;

// Calculate the total of an array of items using reduce and destructuring
export const total = (items) => {
  return items.reduce((sum, { price, qty }) => sum + price * qty, 0);
};
