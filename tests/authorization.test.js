import test from "node:test";
import assert from "node:assert/strict";
import {
  canCheckout,
  hasRole,
  ownsProduct,
  participatesInConversation,
} from "../src/lib/security/authorization.js";

const buyer = { id: "buyer-1", role: "buyer" };
const seller = { id: "seller-1", role: "seller" };

test("role and checkout predicates require the correct account", () => {
  assert.equal(hasRole(buyer, "buyer"), true);
  assert.equal(hasRole(buyer, "seller"), false);
  assert.equal(canCheckout(buyer), true);
  assert.equal(canCheckout(seller), false);
  assert.equal(canCheckout(null), false);
});

test("product ownership requires seller role and matching owner id", () => {
  const product = { seller: { id: "seller-1" } };
  assert.equal(ownsProduct(seller, product), true);
  assert.equal(ownsProduct(buyer, product), false);
  assert.equal(ownsProduct({ id: "seller-2", role: "seller" }, product), false);
});

test("conversation access is limited to listed participants", () => {
  const conversation = {
    participants: { buyer: { id: "buyer-1" }, seller: { id: "seller-1" } },
  };
  assert.equal(participatesInConversation(buyer, conversation), true);
  assert.equal(participatesInConversation(seller, conversation), true);
  assert.equal(
    participatesInConversation({ id: "stranger", role: "buyer" }, conversation),
    false,
  );
  assert.equal(participatesInConversation(null, conversation), false);
});
