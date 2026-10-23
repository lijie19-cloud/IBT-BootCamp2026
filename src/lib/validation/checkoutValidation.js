export function validateCheckout(values) {
  const errors = {};
  const fullName = String(values.fullName || "").trim();
  const phone = String(values.phone || "").replace(/[\s()-]/g, "");
  const address = String(values.address || "").trim();
  const city = String(values.city || "").trim();
  if (fullName.length < 2 || fullName.length > 80)
    errors.fullName = "Enter a valid full name.";
  if (!/^\+?\d{9,15}$/.test(phone))
    errors.phone = "Enter a valid phone number.";
  if (address.length < 5 || address.length > 160)
    errors.address = "Enter a delivery address between 5 and 160 characters.";
  if (city.length < 2 || city.length > 80)
    errors.city = "Enter a valid city or region.";
  return { errors, values: { fullName, phone, address, city } };
}
