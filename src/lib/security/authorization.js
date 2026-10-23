export function hasRole(user, role) {
  return Boolean(user?.id && user.role === role);
}

export function ownsProduct(user, product) {
  return hasRole(user, "seller") && product?.seller?.id === user.id;
}

export function participatesInConversation(user, conversation) {
  return Boolean(
    user?.id &&
    conversation &&
    Object.values(conversation.participants).some(
      (participant) => participant.id === user.id,
    ),
  );
}

export function canCheckout(user) {
  return hasRole(user, "buyer");
}
