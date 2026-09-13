// Import React Context and hooks
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// Create the Cart Context
const CartContext = createContext();

// Local Storage key
const CART_STORAGE_KEY = "shopsphere-cart";

// Load the cart from Local Storage
function loadSavedCart() {
  try {
    // Get the saved cart
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    // If nothing is saved, return an empty cart
    if (!savedCart) {
      return [];
    }

    // Convert the saved JSON string back into JavaScript
    const parsedCart = JSON.parse(savedCart);

    // Make sure the saved data is an array
    if (Array.isArray(parsedCart)) {
      return parsedCart;
    }

    // If the data is not an array, use an empty cart
    return [];
  } catch (error) {
    // Prevent corrupted Local Storage data from crashing the app
    console.error("Failed to load cart from Local Storage:", error);

    return [];
  }
}

// Cart Provider
export function CartProvider({ children }) {
  // Load the initial cart from Local Storage
  const [cart, setCart] = useState(loadSavedCart);

  // Success message state
  const [successMessage, setSuccessMessage] = useState("");

  // Save the cart whenever it changes
  useEffect(() => {
    try {
      // Convert the cart array into a JSON string
      const cartData = JSON.stringify(cart);

      // Save the cart to Local Storage
      localStorage.setItem(CART_STORAGE_KEY, cartData);
    } catch (error) {
      // Handle Local Storage errors
      console.error("Failed to save cart to Local Storage:", error);
    }
  }, [cart]);

  // Add product to cart
  function addToCart(product) {
    setCart((currentCart) => {
      // Check whether the product already exists
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      // If the product already exists
      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      // Add a new product
      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    // Show success message
    setSuccessMessage(`${product.name} added to cart.`);

    // Remove success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  }

  // Increase product quantity
  function increaseQuantity(productId) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  // Decrease product quantity
  function decreaseQuantity(productId) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Remove product completely
  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  }

  // Clear the entire cart
  function clearCart() {
    setCart([]);
  }

  // Calculate total number of products
  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }, [cart]);

  // Calculate total cart price
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }, [cart]);

  // Provide cart data and functions to the application
  const value = {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
    successMessage,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for accessing the cart
export function useCart() {
  const context = useContext(CartContext);

  // Make sure the hook is used inside CartProvider
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
