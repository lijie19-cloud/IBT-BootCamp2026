// tip.js

// 1. Read bill and partySize (Hardcoded for testing, but you can change these)
let billInput = "350"; // Using a string to demonstrate Number() conversion
let partySize = 4;
let paymentMethod = "TeleBirr"; // Try changing to "CBE Birr" or "Cash"

// Convert the bill with Number()
let bill = Number(billInput);

// 2. Add a 10% tip when the bill is over 300 ETB, else 5%.
let tipPercentage = bill > 300 ? 0.1 : 0.05;
let tipAmount = bill * tipPercentage;

// 3. Use a switch to add a TeleBirr / CBE Birr service fee.
let serviceFee = 0;
switch (paymentMethod) {
  case "TeleBirr":
    serviceFee = 2.5;
    break;
  case "CBE Birr":
    serviceFee = 3.0;
    break;
  default:
    serviceFee = 0;
    break;
}
let total = bill + tipAmount + serviceFee;
let perPersonAmount = total / partySize;
console.log(`
🧾 --- Bill Split Summary ---
Payment Method: ${paymentMethod}
Original Bill: ${bill.toFixed(2)} ETB
Tip Amount: ${tipAmount.toFixed(2)} ETB
Service Fee: ${serviceFee.toFixed(2)} ETB
---------------------------
Total to Pay: ${total.toFixed(2)} ETB
Amount per Person: ${perPersonAmount.toFixed(2)} ETB for a party of ${partySize}
`);
