export function normalizeEmail(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

export function validateLogin(values) {
  const errors = {};
  const email = normalizeEmail(values.email);
  if (!email) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email address.";
  if (!values.password) errors.password = "Password is required.";
  return errors;
}

export function validateSignup(values) {
  const errors = validateLogin(values);
  const fullName = String(values.fullName || "").trim();
  if (fullName.length < 2) errors.fullName = "Enter your full name.";
  else if (fullName.length > 80)
    errors.fullName = "Name must be 80 characters or fewer.";
  if (
    !/[a-z]/.test(values.password || "") ||
    !/[A-Z]/.test(values.password || "") ||
    !/\d/.test(values.password || "") ||
    String(values.password || "").length < 8
  )
    errors.password =
      "Use at least 8 characters with uppercase, lowercase, and a number.";
  if (values.confirmPassword !== values.password)
    errors.confirmPassword = "Passwords do not match.";
  if (!["buyer", "seller"].includes(values.role))
    errors.role = "Choose Buyer or Seller.";
  return errors;
}

export function validateProfile(values) {
  const errors = {};
  const fullName = String(values.fullName || "").trim();
  const location = String(values.location || "").trim();
  if (fullName.length < 2 || fullName.length > 80)
    errors.fullName = "Enter a name between 2 and 80 characters.";
  if (location.length > 80)
    errors.location = "Location must be 80 characters or fewer.";
  return errors;
}
