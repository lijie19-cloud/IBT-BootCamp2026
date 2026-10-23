import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeEmail,
  validateLogin,
  validateSignup,
} from "../src/lib/validation/authValidation.js";
import { validateCheckout } from "../src/lib/validation/checkoutValidation.js";
import { validateMessage } from "../src/lib/validation/messageValidation.js";
import {
  normalizeCatalogFilters,
  validateProductInput,
} from "../src/lib/validation/productValidation.js";

test("email normalization trims and lowercases", () => {
  assert.equal(
    normalizeEmail("  Buyer@MarketHub.Demo "),
    "buyer@markethub.demo",
  );
});

test("login validation rejects malformed input", () => {
  assert.deepEqual(validateLogin({ email: "not-an-email", password: "" }), {
    email: "Enter a valid email address.",
    password: "Password is required.",
  });
});

test("signup requires matching strong passwords and a valid role", () => {
  const errors = validateSignup({
    fullName: "A",
    email: "a@example.com",
    password: "weak",
    confirmPassword: "different",
    role: "admin",
  });
  assert.ok(errors.fullName);
  assert.ok(errors.password);
  assert.ok(errors.confirmPassword);
  assert.ok(errors.role);
});

test("catalog filters reject negative prices and unknown sorting", () => {
  const result = normalizeCatalogFilters({
    query: "  coffee  ",
    minPrice: "-2",
    maxPrice: "900",
    sort: "unsafe",
    page: "0",
  });
  assert.deepEqual(result, {
    query: "coffee",
    category: "",
    minPrice: null,
    maxPrice: 900,
    sort: "newest",
    page: 1,
  });
});

test("product validation normalizes numbers and accepts allowlisted local images", () => {
  const result = validateProductInput(
    {
      name: "Coffee beans",
      description: "A detailed description long enough for a product.",
      price: "780",
      stock: "4",
      category: "food-drink",
      image: "/images/products/coffee.svg",
      status: "active",
    },
    ["food-drink"],
  );
  assert.deepEqual(result.errors, {});
  assert.equal(result.data.price, 780);
  assert.equal(result.data.stock, 4);
});

test("product validation rejects unsafe image schemes and invalid stock", () => {
  const result = validateProductInput(
    {
      name: "Coffee beans",
      description: "A detailed description long enough for a product.",
      price: "780",
      stock: "-1",
      category: "food-drink",
      image: "javascript:alert(1)",
      status: "active",
    },
    ["food-drink"],
  );
  assert.ok(result.errors.stock);
  assert.ok(result.errors.image);
});

test("messages are trimmed, required, and length limited", () => {
  assert.deepEqual(validateMessage("  hello  "), { ok: true, value: "hello" });
  assert.equal(validateMessage("   ").ok, false);
  assert.equal(validateMessage("a".repeat(1001)).ok, false);
});

test("checkout validates normalized delivery fields", () => {
  const valid = validateCheckout({
    fullName: "Mimi Tesfaye",
    phone: "+251 911 234 567",
    address: "Bole Road, Building 4",
    city: "Addis Ababa",
  });
  assert.deepEqual(valid.errors, {});
  assert.equal(valid.values.phone, "+251911234567");
  const invalid = validateCheckout({
    fullName: "",
    phone: "abc",
    address: "x",
    city: "",
  });
  assert.equal(Object.keys(invalid.errors).length, 4);
});
