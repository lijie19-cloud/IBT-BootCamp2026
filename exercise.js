v; // ==========================================
// 1. DATA (Previously transactions.js)
// ==========================================
const transactions = [
  { id: 1, customer: "Almaz", amount: 250, type: "debit" },
  { id: 2, customer: "Dawit", amount: 600, type: "credit" },
  { id: 3, customer: "Tigist", amount: 180, type: "debit" },
  { id: 4, customer: "Hana", amount: 450, type: "credit" },
];

// ==========================================
// 2. LOGIC (Previously report.js)
// ==========================================

// Use filter and reduce to calculate totals
const totalByType = (txns, transactionType) =>
  txns
    .filter((t) => t.type === transactionType)
    .reduce((sum, { amount }) => sum + amount, 0);

// Use map and destructuring to format receipts
const formatReceipts = (txns) =>
  txns.map(({ customer, amount }) => `${customer}: ${amount.toFixed(2)} ETB`);

// Use spread syntax to create a copy and update a transaction
const correctAmount = (txn, newAmount) => ({
  ...txn,
  amount: newAmount,
});

// ==========================================
// 3. APP (Previously app.js)
// ==========================================

// Calculate totals
const credits = totalByType(transactions, "credit");
const debits = totalByType(transactions, "debit");

// Print the main report
console.log("=== TELEBIRR TRANSACTION REPORT ===");
console.log(`Credits: ${credits} ETB`);
console.log(`Debits:  ${debits} ETB`);

// Print the formatted receipts
console.log("\n=== RECEIPTS ===");
const receipts = formatReceipts(transactions);
receipts.forEach((receipt) => console.log(receipt));

// Demonstrate the spread operator (updating without mutating)
const corrected = correctAmount(transactions[0], 300);

console.log("\n=== SPREAD OPERATOR TEST ===");
console.log("Corrected transaction (Copy):");
console.log(corrected);

console.log("\nOriginal transaction (Unchanged):");
console.log(transactions[0]);
