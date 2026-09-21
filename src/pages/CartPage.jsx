import Cart from "../components/Cart";
import CartErrorBoundary from "../components/CartErrorBoundary";

function CartPage() {
  return (
    <CartErrorBoundary>
      <Cart />
    </CartErrorBoundary>
  );
}

export default CartPage;
